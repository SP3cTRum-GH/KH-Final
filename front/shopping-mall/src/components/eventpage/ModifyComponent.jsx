import { useEffect, useState, useRef } from "react";
import { deleteOne, getOne, putOne } from "../../api/eventApi";
import { API_SERVER_HOST } from "../../api/eventApi";
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
};
const host = API_SERVER_HOST;

const ModifyComponent = ({ no }) => {
  const [event, setEvent] = useState(initState);
  const uploadRef = useRef();
  //결과 모달(result 결과에 따라서 화면이동에 사용 result = 'Modified'  or 'Deleted')
  const [result, setResult] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  //이동용 함수
  const { moveToEventRead, moveToEventList } = useCustomMove();

  useEffect(() => {
    getOne(no).then((data) => {
      setEvent(data);
    });
  }, [no]);

  const handleChangeEvent = (e) => {
    event[e.target.name] = e.target.value;
    setEvent({ ...event });
  };

  const handleClickModify = () => {
    const files = uploadRef.current.files;
    const formData = new FormData();

    formData.append("imgFile", files[0]);

    //other data
    formData.append("title", event.title);
    formData.append("content", event.content);
    formData.append("startDate", event.startDate);
    formData.append("endDate", event.endDate);
    formData.append("img", event.img);

    //수정 처리
    //setResult("Modified");
    putOne(no, formData).then((data) => {
      setResult("Modified");
    });
  };

  const handleClickDelete = () => {
    console.log(`handleClickDelete before`);
    deleteOne(no).then((data) => {
      setResult("Deleted");
    });
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
              value={event.startDate}
              onChange={handleChangeEvent}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label>
            종료일
            <Input
              type="date"
              name="endDate"
              value={event.endDate}
              onChange={handleChangeEvent}
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
