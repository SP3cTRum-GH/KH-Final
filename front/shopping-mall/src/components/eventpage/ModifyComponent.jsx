import { useEffect, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/eventApi";
import { API_SERVER_HOST } from "../../api/HostUrl";
import useCustomMove from "../../hooks/useCustomMove";
import {
  PageWrapper,
  Section,
  SectionTitle,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  Button,
  ThumbnailWrapper,
  Thumbnail,
} from "../admin/ModifyPageStyle";
import ImageUploader from "../admin/ImageUploader";

const initState = {
  no: "",
  title: "",
  content: "",
  startDate: "",
  endDate: "",
  img: "",
  imageFileNames: [],
};

const ModifyComponent = ({ no }) => {
  const [event, setEvent] = useState(initState);
  //결과 모달(result 결과에 따라서 화면이동에 사용 result = 'Modified'  or 'Deleted')
  const [result, setResult] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  //이동용 함수
  const { moveToEventList } = useCustomMove();

  useEffect(() => {
    getOne(no).then((data) => {
      // previewImages 초기화
      const previews = data.imageFileNames?.map((fileName) => ({
        url: `${API_SERVER_HOST}/api/events/view/${fileName}`,
        file: null, // 기존 이미지라면 file은 null
      }));
      setPreviewImages(previews || []);
      setEvent(data);
    });
  }, [no]);

  const handleChangeEvent = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const formatDateForInput = (dateTimeStr) => {
    if (!dateTimeStr) return "";
    return dateTimeStr.split("T")[0]; // yyyy-MM-dd
  };

  const handleClickModify = async () => {
    const formData = new FormData();

    // 새로 추가된 이미지 파일만 append
    previewImages.forEach((img) => {
      if (img.file) formData.append("uploadFiles", img.file);
    });

    formData.append("title", event.title);
    formData.append("content", event.content);
    formData.append("startDate", event.startDate);
    formData.append("endDate", event.endDate);

    try {
      await putOne(no, formData); // axios에서 FormData 전송
      setResult("Modified");
    } catch (err) {
      console.error("수정 실패:", err);
    }
  };

  const handleClickDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return; // 삭제 확인
    try {
      const res = await deleteOne(no);
      if (res.RESULT === "SUCCESS") {
        setResult("Deleted");
        moveToEventList(); // 삭제 후 리스트로 이동
      } else {
        console.error("삭제 실패:", res);
        alert("삭제에 실패했습니다.");
      }
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <PageWrapper>
      {/* 기본 정보 */}
      <Section>
        <SectionTitle>기본 정보</SectionTitle>
        <FormGroup>
          <Label>
            이벤트 제목
            <Input
              name="title"
              value={event.title}
              onChange={handleChangeEvent}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label>
            내용
            <Input
              name="content"
              rows={4}
              value={event.content}
              onChange={handleChangeEvent}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label>
            시작일
            <Input
              type="date"
              name="startDate"
              value={formatDateForInput(event.startDate)}
              onChange={(e) =>
                setEvent((prev) => ({
                  ...prev,
                  startDate: `${e.target.value}T00:00:00`,
                }))
              }
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label>
            종료일
            <Input
              type="date"
              name="endDate"
              value={formatDateForInput(event.endDate)}
              onChange={(e) =>
                setEvent((prev) => ({
                  ...prev,
                  endDate: `${e.target.value}T00:00:00`,
                }))
              }
            />
          </Label>
        </FormGroup>
      </Section>

      <ImageUploader
        previewImages={previewImages}
        setPreviewImages={setPreviewImages}
      />

      {/* 버튼 */}
      <ButtonGroup>
        <Button className="delete" onClick={handleClickDelete}>
          삭제
        </Button>
        <Button className="modify" onClick={handleClickModify}>
          수정
        </Button>
        <Button className="list" onClick={moveToEventList}>
          리스트
        </Button>
      </ButtonGroup>
    </PageWrapper>
  );
};
export default ModifyComponent;
