import React, { useEffect, useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './styles/WritePage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import saveIcon from '../assets/images/saveIcon.png';
import listIcon from '../assets/images/listIcon.png';

const uploadPostURL: string = 'http://localhost:8080/api/postData/upload';
const getBoardTypeURL: string = 'http://localhost:8080/api/postData/getTypes';
const uploadImageURL: string = 'http://localhost:8080/api/postData/uploadFile';

function WritePage() {
  const navigate = useNavigate();
  const postTitle = useRef('');
  const postContent = useRef('');
  const postWriter = useRef('');
  const postPassword = useRef('');
  const [boardType, setBoardType] = useState('free');
  const [typeKeyValues, setTypeKeyValues] = useState<string[][]>();

  // 이미지 파일 업로드시 필요
  function uploadAdapter(loader: { file: Promise<any> }) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file: string | Blob) => {
            body.append('files', file);
            axios
              .post(uploadImageURL, body)
              .then((res: any) => {
                resolve({
                  default: res.data,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  // 이미지 파일 업로드 시 필요
  function uploadPlugin(editor: any) {
    // eslint-disable-next-line no-param-reassign
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return uploadAdapter(loader);
    };
  }

  const customConfig = {
    extraPlugins: [uploadPlugin], //
    placeholder: ' 내용을 입력하세요',
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'blockQuote',
        'insertTable',
        '|',
        'imageUpload', // 나중에 s3버킷 추가 후에 활성화
        'undo',
        'redo',
      ],
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
  };

  // 작성한 게시물을 백엔드에 저장하고 메인페이지로 이동
  async function savePostData() {
    if (postTitle.current.length > 50) {
      alert('제목의 길이를 초과했습니다!');
      return;
    }
    if (postContent.current.length > 100000) {
      alert('게시물의 용량을 초과했습니다!');
      return;
    }
    const req = {
      title: postTitle.current, // 제목 input 태그 값 가져오기
      content: postContent.current, // 에디터에서 내용 가져오기
      type: boardType, // 게시판 combobox 값 가져오기
      writer: postWriter.current, // 아래 작성자 input 태그 값 가져오기
      password: postPassword.current, // 아래 비밀번호 input 태그 값 가져오기
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

  function writerChange(e: { target: { value: string } }) {
    postWriter.current = e.target.value;
  }

  function passwordChange(e: { target: { value: string } }) {
    postPassword.current = e.target.value;
    console.log(postPassword.current);
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
              <option>불러오기 실패</option>
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
        config={customConfig}
        data="<p></p>"
        onReady={(editor: any) => {
          // You can store the "editor" and use when it is needed.
          console.log(editor);
        }}
        onChange={(event: any, editor: { getData: () => any }) => {
          const data = editor.getData();
          postContent.current = data;
        }}
      />
      <div className="bottomMenus">
        <div className="infoInputDiv">
          작성자:{' '}
          <input
            className="writerInput"
            type="text"
            placeholder="작성자"
            onChange={writerChange}
          />{' '}
          비밀번호:{' '}
          <input
            className="passwordInput"
            type="password"
            placeholder="비밀번호"
            onChange={passwordChange}
          />
        </div>
        <div className="saveButtonDiv">
          <button
            className="goListButton"
            type="button"
            onClick={() => navigate('/')}
          >
            <img alt="" src={listIcon} />
            <span>목록으로</span>
          </button>
          <button className="saveButton" onClick={uploadPost} type="button">
            <img className="saveIcon" src={saveIcon} alt="" />
            <span className="saveText">저장하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WritePage;
