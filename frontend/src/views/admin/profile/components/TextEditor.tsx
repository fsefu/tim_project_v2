import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    [{ align: [] }, { color: [] }, { background: [] }],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "color",
  "background",
];

function TextEditor({ newsletterContnent }: any) {
  const [value, setValue] = useState("");
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    setValue(newsletterContnent);
  }, [newsletterContnent]);

  const handleChange = (content, delta, source, editor) => {
    setValue(editor.getHTML());
  };

  const handleSelectionChange = (range, source, editor) => {
    if (range && range.length > 0) {
      const selected = editor.getText(range.index, range.length);
      console.log("Selected: ", selected);
      setSelectedText(selected);
    } else {
      setSelectedText("");
    }
  };

  const handleButtonClick = () => {
    // Implement functionality for the button action
    alert("Selected text: " + selectedText);
  };

  return (
    <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 min-h-52">
      <ReactQuill
        style={{ height: "auto" }}
        theme="snow"
        modules={{ ...modules, ...{ clipboard: { matchVisual: false } } }} // Add clipboard module to disable Quill's handling of selection for better control
        formats={formats}
        value={value}
        onChange={handleChange}
        onChangeSelection={handleSelectionChange}
      />
      {selectedText && (
        <button onClick={handleButtonClick} className="mt-2">
          Custom Action
        </button>
      )}
    </div>
  );
}

export default TextEditor;

// import React, { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import styled from "styled-components";

// const modules = {
//   toolbar: [
//     //[{ 'font': [] }],
//     [{ header: [1, 2, false] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [
//       { list: "ordered" },
//       { list: "bullet" },
//       { indent: "-1" },
//       { indent: "+1" },
//     ],
//     ["link", "image"],
//     [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
//     ["clean"],
//   ],
// };

// const formats = [
//   //'font',
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
//   "align",
//   "color",
//   "background",
// ];

// function TextEditor({ newsletterContnent }: any) {
//   console.log("newsletterContnent: ", newsletterContnent);
//   const [value, setValue] = useState("");
//   // const handleChange = (content, delta, source, editor) => {
//   useEffect(() => {
//     setValue(newsletterContnent); // Initialize value state when newsletterContnent prop changes
//   }, [newsletterContnent]);

//   const handleChange = (content, delta, source, editor) => {
//     console.log(editor.getHTML());
//     setValue(editor.getHTML());
//   };

//   return (
//     <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 min-h-52">
//       <ReactQuill
//         style={{ height: "auto" }} // Adjust the value as needed
//         theme="snow"
//         modules={modules}
//         formats={formats}
//         value={value}
//         onChange={handleChange}
//       />
//     </div>
//   );
// }

// export default TextEditor;
