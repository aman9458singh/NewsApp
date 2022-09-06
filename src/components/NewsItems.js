import React from "react";
const NewsItems=(props)=>{
    let { title, description, imageUrl, newsurl, author, date ,source} = props;
    return (
      <div className="my-3">
        <div className="card">
          <img
            src={
              !imageUrl
                ? (imageUrl =
                    "https://i.ytimg.com/vi/6afOlPZC1pY/hqdefault.jpg")
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              <span className="position-absolute top-0 translate-middle badge rounded-pill bg-secondary" style={{zIndex:"1",left:"87%"}}>
                {source}
              </span>
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-danger">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsurl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItems;
