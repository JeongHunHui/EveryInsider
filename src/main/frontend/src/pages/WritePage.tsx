import React, { useEffect, useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './styles/WritePage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import saveIcon from '../assets/images/saveIcon.png';

const uploadPostURL: string = 'http://localhost:8080/api/postData/upload';
const getBoardTypeURL: string = 'http://localhost:8080/api/postData/getTypes';

function WritePage() {
  const navigate = useNavigate();
  const postTitle = useRef('');
  const postContent = useRef('');
  const [boardType, setBoardType] = useState('free');
  const [typeKeyValues, setTypeKeyValues] = useState<string[][]>();

  // 작성한 게시물을 백엔드에 저장하고 메인페이지로 이동
  async function savePostData() {
    const req = {
      title: postTitle.current, // 제목 input 태그 값 가져오기
      content: postContent.current, // 에디터에서 내용 가져오기
      type: boardType, // 게시판 combobox 값 가져오기
    };
    console.log(req);

    await axios
      .post(uploadPostURL, req)
      .then((res) => {
        console.log(res.data);
        navigate('/', { replace: true });
      })
      .catch((error) => console.log(error));
  }

  // 게시판 type을 백엔드에서 불러온다
  async function getBoardType() {
    await axios
      .get(getBoardTypeURL)
      .then((res) => {
        console.log(res.data);
        setTypeKeyValues(res.data);
      })
      .catch((error) => {
        console.log(error);
        setTypeKeyValues([['test', '테스트']]);
      });
  }

  function uploadPost() {
    savePostData();
  }

  function titleChange(e: { target: { value: string } }) {
    postTitle.current = e.target.value;
  }

  function typeChange(e: { target: { value: string } }) {
    setBoardType(e.target.value);
  }

  useEffect(() => {
    getBoardType();
  }, []);

  return (
    <div className="editorDiv">
      <div className="setInfoDiv">
        <form className="boardTypeComboBox">
          <select name="boardType" onChange={typeChange} value={boardType}>
            {typeKeyValues ? (
              typeKeyValues.map((keyValues: string[]) => (
                <option value={keyValues[0]} key={keyValues[0]}>
                  {keyValues[1]}게시판
                </option>
              ))
            ) : (
              <div />
            )}
          </select>
        </form>
        <input
          className="title-input"
          type="text"
          placeholder="제목을 입력하세요"
          onChange={titleChange}
        />
      </div>
      <CKEditor
        editor={ClassicEditor}
        config={{
          placeholder: ' 내용을 입력하세요',
        }}
        data="<p></p>"
        onReady={(editor: any) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event: any, editor: { getData: () => any }) => {
          const data = editor.getData();
          postContent.current = data;
        }}
      />
      <div className="saveButtonDiv">
        <button className="saveButton" onClick={uploadPost} type="button">
          <img className="saveIcon" src={saveIcon} alt="" />
          <span className="saveText">저장하기</span>
        </button>
      </div>
    </div>
  );
}

export default WritePage;
