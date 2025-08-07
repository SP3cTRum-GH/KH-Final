package com.kh.finalProject.security.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.google.gson.Gson;
import com.kh.finalProject.security.domain.CustomUser;
import com.kh.finalProject.util.JWTUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class JWTCheckFilter extends OncePerRequestFilter { // http 통신 요청당 한번만 사용되는 필터
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		log.info("--------------------JWTCheckFilter ------------------------------------------------------ ");

		String authHeaderStr = request.getHeader("Authorization");
		try {
			// Bearer accestoken ............... 토큰이 정상적이면 그대로 요구사항진행
			String accessToken = authHeaderStr.substring(7);
			Map<String, Object> claims = JWTUtil.validateToken(accessToken);
			log.info("JWT claims: " + claims);
			String memberId = (String) claims.get("memberId");
			String memberPw = (String) claims.get("memberPw");
			String memberName = (String) claims.get("memberName");
			String memberEmail = (String) claims.get("memberEmail");
			String memberPhone = (String) claims.get("memberPhone");
			Boolean memberGender = (Boolean) claims.get("memberGender");
			String OAuth = (String) claims.get("OAuth");
			List<String> roleNames = (List<String>) claims.get("roleNames");
			CustomUser customUser = new CustomUser(memberId, memberPw, memberName, memberEmail, memberPhone,
					memberGender, OAuth, roleNames);
			log.info(" ----------------------------------------------------------------- ");
			log.info(customUser);
			log.info(customUser.getAuthorities());
			// 스프링 시큐리티에서 인증 정보를 담는 객체
			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(customUser,
					memberPw, customUser.getAuthorities());
			// 이 객체를 SecurityContextHolder에 넣으면 해당 요청은 인증된 사용자로 처리됨

			SecurityContextHolder.getContext().setAuthentication(authenticationToken);
			filterChain.doFilter(request, response);
		} catch (Exception e) {
			log.error("JWT Check Error .................................... ");
			log.error(e.getMessage());
			Gson gson = new Gson();
			String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));

			response.setContentType("application/json");
			PrintWriter printWriter = response.getWriter();
			printWriter.println(msg);
			printWriter.close();
		}
	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException { // 특정 조건일 때 필터 건너뛰기
		// Preflight (지금 보내는 요청이 유효한지를 확인하기 위해 OPTIONS 메서드로 예비 요청을 보내는 것
		if (request.getMethod().equals("OPTIONS")) {
			return true;
		}
		String path = request.getRequestURI();
		log.info("check uri. .............. " + path);
		if (path.startsWith("/api/member/")) {
			return true;
		} // 이미지 조회 경로는 체크하지 않하고 싶을 때
		if (path.startsWith("/api/products/view/")) {
			return true;
		}
		return false;
	}
}
