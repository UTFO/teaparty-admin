import { fileNameToSrc } from "../../../../helper";
import "./scrollContainer.css";

function ListContainer(props) {
  // S3 Bucket Name
  const S3_BUCKET = process.env.REACT_APP_S3_BUCKET_NAME;

  // S3 Region
  const REGION = process.env.REACT_APP_S3_REGION;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "#ECECEC",
        padding: "15px 20px 15px 15px",
        borderRadius: "19pt",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "30px",
          width: "100%",
        }}
      >
        {props.image && (
          <img
            src={fileNameToSrc(props.image)}
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "19px",
            }}
          />
        )}

        {props.name && (
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "18pt",
                width: "100%",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                alignSelf: props.answer ? "start" : "center",
              }}
            >
              {props.name}
            </p>
            <p
              style={{
                margin: 0,
                marginLeft: "3rem",
                fontSize: "15pt",
                width: "100%",
              }}
            >
              {props.date}{" "}
              <span style={{ marginLeft: "1.5rem" }}>{props.time}</span>
            </p>
          </div>
        )}
        <p
          style={{
            margin: 0,
            fontSize: "18pt",
            width: "40%",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            alignSelf: props.answer ? "start" : "center",
          }}
        >
          {props.title}
        </p>
        <p
          style={{
            margin: 0,
            marginLeft: "3rem",
            fontSize: "15pt",
            maxWidth: "50%",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {props.answer}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          className="admin-hover-image"
          style={{
            height: "fit-content",
            backgroundColor: "transparent",
            borderWidth: 0,
            cursor: "pointer",
          }}
          onClick={props.editFunction}
        >
          <img src="/pencil.png" />
        </button>
        <button
          className="admin-hover-image"
          style={{
            height: "fit-content",
            backgroundColor: "transparent",
            borderWidth: 0,
            cursor: "pointer",
          }}
          onClick={props.deleteFunction}
        >
          <img src="/trash.png" />
        </button>
      </div>
    </div>
  );
}

function ScrollContainer(props) {
  return (
    <div
      className="admin-scrollbar"
      style={{ height: "60vh", display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          borderBottom: "1px solid black",
          display: "flex",
          justifyContent: "end",
          marginBottom: 10,
        }}
      >
        <button
          className="admin-hover-image"
          style={{
            backgroundColor: "transparent",
            borderWidth: 0,
            cursor: "pointer",
          }}
          onClick={props.handleOpen}
        >
          <img src="/plus.png" />
        </button>
      </div>
      <div className="admin-scroll-container">{props.children}</div>
    </div>
  );
}

export { ScrollContainer, ListContainer };
