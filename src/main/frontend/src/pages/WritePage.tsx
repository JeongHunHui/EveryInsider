import React, { useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './styles/WritePage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const uploadPostURL: string = 'http://localhost:8080/api/postData/upload';

function WritePage() {
  const navigate = useNavigate();
  const postTitle = useRef('');
  const postContent = useRef('');
  const [boardType, setBoardType] = useState('free');

  // 나중에 백엔드에서 불러와서 하기
  const typeList = [
    { type: 'free', name: '자유게시판' },
    { type: 'humor', name: '유머게시판' },
    { type: 'issue', name: '이슈게시판' },
    { type: 'secret', name: '비밀게시판' },
  ];

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

  function uploadPost() {
    savePostData();
  }

  function titleChange(e: { target: { value: string } }) {
    postTitle.current = e.target.value;
  }

  function typeChange(e: { target: { value: string } }) {
    setBoardType(e.target.value);
  }

  return (
    <div className="editorDiv">
      <div className="setInfoDiv">
        <form className="boardTypeComboBox">
          <select name="boardType" onChange={typeChange} value={boardType}>
            {typeList.map(({ type, name }) => (
              <option value={type} key={type}>
                {name}
              </option>
            ))}
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
      <div>
        <button className="saveButton" onClick={uploadPost} type="button">
          저장하기
        </button>
      </div>
    </div>
  );
}

export default WritePage;
