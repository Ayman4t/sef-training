import { React, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/AddArticle.css";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const AddArticle = () => {
  const [articleTitle, setArticleTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [publishingDate, setPublishingDate] = useState("");
  const [path, setPath] = useState("");

  // const [file, setFile] = useState(null);

  useEffect(() => {
    const editArticleId = localStorage.getItem("editArticleId");

    if (editArticleId) {
      const existingData =
        JSON.parse(localStorage.getItem("articleData")) || [];
      const articleToEdit = existingData.find(
        (article) => article.id === parseInt(editArticleId)
      );

      if (articleToEdit) {
        setArticleTitle(articleToEdit.articleTitle);
        setCategory(articleToEdit.category);
        setContent(articleToEdit.content);
        setPublishingDate(articleToEdit.publishingDate);
        setPath(articleToEdit.path);
      }
    } else {
      // Clear the form fields for creating a new article
      setArticleTitle("");
      setCategory("");
      setContent("");
      setPublishingDate("");
      setPath("");
    }
  }, []);

  const handleCancel = () => {
    // Reset the form fields
    setArticleTitle("");
    setCategory("");
    setContent("");
    setPublishingDate("");
    setPath("");
    // setFile(null);

    // Go back to the previous page
    window.history.back();
  };

  const handleSave = () => {
    const editArticleId = localStorage.getItem("editArticleId");
    const existingData = JSON.parse(localStorage.getItem("articleData")) || [];

    if (!articleTitle || !category || !content || !publishingDate || !path) {
      alert("Please fill in all required fields");
      return;
    }

    let updatedData;

    if (editArticleId) {
      // Edit the existing article
      updatedData = existingData.map((article) =>
        article.id === parseInt(editArticleId)
          ? {
              id: parseInt(editArticleId),
              articleTitle,
              category,
              content,
              publishingDate,
              path,
              status: "draft",
            }
          : article
      );
    } else {
      // Create a new article
      const newId = existingData.length
        ? existingData[existingData.length - 1].id + 1
        : 1;
      updatedData = [
        ...existingData,
        {
          id: newId,
          articleTitle,
          category,
          content,
          publishingDate,
          path,
          status: "draft",
        },
      ];
    }

    localStorage.setItem("articleData", JSON.stringify(updatedData));

    // Clear form fields after save
    setArticleTitle("");
    setCategory("");
    setContent("");
    setPublishingDate("");
    setPath("");
    // Go back to the previous page
    window.history.back();
  };

  const handlePublish = () => {
    const editArticleId = localStorage.getItem("editArticleId");
    const existingData = JSON.parse(localStorage.getItem("articleData")) || [];

    if (!articleTitle || !category || !content || !publishingDate || !path) {
      alert("Please fill in all required fields");
      return;
    }

    let updatedData;

    if (editArticleId) {
      // Edit the existing article
      updatedData = existingData.map((article) =>
        article.id === parseInt(editArticleId)
          ? {
              id: parseInt(editArticleId),
              articleTitle,
              category,
              content,
              publishingDate,
              path,
              status: "published",
            }
          : article
      );
    } else {
      // Create a new article
      const newId = existingData.length
        ? existingData[existingData.length - 1].id + 1
        : 1;
      updatedData = [
        ...existingData,
        {
          id: newId,
          articleTitle,
          category,
          content,
          publishingDate,
          path,
          status: "published",
        },
      ];
    }

    localStorage.setItem("articleData", JSON.stringify(updatedData));

    // Clear form fields after save
    setArticleTitle("");
    setCategory("");
    setContent("");
    setPublishingDate("");
    setPath("");
    // Go back to the previous page
    window.history.back();
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPath(reader.result); // Set the Base64 string
        console.log("Base64 Image:", reader.result); // You can check the Base64 string in console
      };
      reader.readAsDataURL(selectedFile); // Convert file to Base64 string
    } else {
      setPath("");
    }
  };
  
  return (
    <div className="jop">
      <div className="main">
        <div className="slidepart">
          <div className="slidehead">
            <h5>Admin Panel</h5>
            <div className="underline"></div>
            <p>6th June 2023</p>
          </div>

          <div className="slidenav d-none d-sm-block">
            <div className="users">
              <a href="#">
                <h5>Users</h5>
              </a>

              <ul>
                <li>
                  <a className="active" href="#">
                    Admin
                  </a>
                </li>
                <li>
                  <a href="#">Editor</a>
                </li>
                <li>
                  <a href="#">Instructors</a>
                </li>
                <li>
                  <a href="#">Students</a>
                </li>
              </ul>
            </div>

            <div className="articles">
              <a href="#">
                <h5>Articles</h5>
              </a>

              <ul>
                <li>
                  <a className="active" href="#">
                    Published Articles
                  </a>
                </li>
                <li>
                  <a href="#">Scheduled Articles</a>
                </li>
                <li>
                  <a href="#">Saved Drafts</a>
                </li>
              </ul>
            </div>

            <div className="jops">
              <a href="#">
                <h5>Jops</h5>
              </a>

              <ul>
                <li>
                  <a className="active" href="#">
                    Published Jobs
                  </a>
                </li>
                <li>
                  <a href="#">Saved Drafts</a>
                </li>
              </ul>
            </div>

            <div className="courses">
              <a href="#">
                <h5>Courses</h5>
              </a>

              <ul>
                <li>
                  <a className="active" href="#">
                    Published Courses
                  </a>
                </li>
                <li>
                  <a href="#">Scheduled Courses</a>
                </li>
                <li>
                  <a href="#">Saved Drafts</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="contentpart ">
          <div>
            <div>
              <div className="articlestitle">
                <div>
                  <h5>Add Article Details</h5>
                  <div className="underline"></div>
                </div>
                <button
                  type="button"
                  onClick={handlePublish}
                  className="btn btn-warning publish d-none d-sm-block"
                >
                  Publish
                </button>
              </div>
              <div className="articledetails d-none d-sm-block">
                <div className="articletitleadd">
                  <div className="title ">
                    <p>Article Title</p>
                    <input
                      value={articleTitle}
                      onChange={(e) => setArticleTitle(e.target.value)}
                    />
                  </div>
                  <div className="category">
                    <p>Category</p>
                    <input
                      list="article-titles"
                      name="article-title"
                      id="article-title"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    <datalist id="article-titles">
                      <option value="Sports" />
                      <option value="Arts" />
                      <option value="Sciences" />
                      <option value="News" />
                      <option value="Others" />
                    </datalist>
                  </div>
                </div>
                <div className="content">
                  <p>Content</p>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
                <div className="Date">
                  <p>Publishing Date</p>
                  <input
                    type="datetime-local"
                    value={publishingDate}
                    onChange={(e) => setPublishingDate(e.target.value)}
                  />
                </div>
                <div className="upload">
                  <div className="upload-container">
                    <p>Upload Cover Photo</p>
                    <div className="upload-box">
                      <div className="upload-icon">
                        <FontAwesomeIcon
                          icon={faCloudArrowUp}
                          style={{
                            display: "block",
                            margin: "0 auto 20px",
                            color: "#e3b43b",
                            fontSize: "50px",
                          }}
                        />
                      </div>
                      <p>
                        Drag & drop files or
                        <span
                          className="browse"
                          onClick={() =>
                            document.getElementById("fileInput").click()
                          }
                        >
                          Browse
                        </span>
                      </p>
                      <p className="supported-formats">
                        Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI,
                        Word, PPT
                      </p>
                    </div>
                    <div className="button-container">
                      <button className="cancel-button" onClick={handleCancel}>
                        CANCEL
                      </button>
                      <button
                        type="button"
                        onClick={handlePublish}
                        className="btn btn-warning publish d-block d-sm-none"
                      >
                        Publish
                      </button>

                      <button
                        className="save-button d-none d-sm-block"
                        onClick={handleSave}
                      >
                        SAVE
                      </button>
                    </div>
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
              </div>
              {/* d-block d-sm-none */}
              <div className="articledetails d-block d-sm-none">
                <div className="upload">
                  <div className="upload-container">
                    <p>Upload Cover Photo</p>
                    <div className="upload-box">
                      <div className="upload-icon">
                        <FontAwesomeIcon
                          icon={faCloudArrowUp}
                          style={{
                            display: "block",
                            margin: "0 auto 20px",
                            color: "#e3b43b",
                            fontSize: "50px",
                          }}
                        />
                      </div>
                      <p>
                        Drag & drop files or
                        <span
                          className="browse"
                          onClick={() =>
                            document.getElementById("fileInput").click()
                          }
                        >
                          Browse
                        </span>
                      </p>
                      <p className="supported-formats">
                        Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI,
                        Word, PPT
                      </p>
                    </div>

                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
                <div className="articletitleadd">
                  <div className="title ">
                    <p>Article Title</p>
                    <input
                      value={articleTitle}
                      onChange={(e) => setArticleTitle(e.target.value)}
                    />
                  </div>
                  <div className="category">
                    <p>Category</p>
                    <input
                      list="article-titles"
                      name="article-title"
                      id="article-title"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    <datalist id="article-titles">
                      <option value="Sports" />
                      <option value="Arts" />
                      <option value="Sciences" />
                      <option value="News" />
                      <option value="Others" />
                    </datalist>
                  </div>
                </div>
                <div className="content">
                  <p>Content</p>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
                <div className="Date">
                  <p>Publishing Date</p>
                  <input
                    type="date"
                    value={publishingDate}
                    onChange={(e) => setPublishingDate(e.target.value)}
                  />
                </div>
                <div className="button-container">
                  <button
                    className="save-button d-none d-sm-block"
                    onClick={handleSave}
                  >
                    SAVE
                  </button>
                  <button
                    type="button"
                    onClick={handlePublish}
                    className="btn btn-warning publish d-block d-sm-none"
                  >
                    Publish
                  </button>
                  <button className="cancel-button" onClick={handleCancel}>
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArticle;
