import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './styles/WritePage.css';

function WritePage() {
  return (
    <div className="editorDiv">
      <div className="setInfoDiv">
        <form className="boardTypeComboBox">
          <select name="boardType">
            <option value="free" selected>
              자유게시판
            </option>
            <option value="humor">유머게시판</option>
            <option value="issue">이슈게시판</option>
            <option value="secret">비밀게시판</option>
          </select>
        </form>
        <input className="title-input" type="text" placeholder="제목" />
      </div>
      <CKEditor
        editor={ClassicEditor}
        config={{
          placeholder: ' 내용을 입력하세요.',
        }}
        data="<p></p>"
        onReady={(editor: any) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event: any, editor: { getData: () => any }) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
      />
    </div>
  );
}

export default WritePage;
