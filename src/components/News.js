import React, { useState , useEffect } from "react";
import NewsItems from "./NewsItems";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=>{
 const [isloading, setisloading] = useState(true)
 const [page, setpage] = useState(1)
 const [totalResults, setotalResults] = useState(0)
 const [articles, setarticles] = useState([])

 
   
 const CapitlizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  
  
  const updateNews = async ()=> {
    props.setProgress(0);
    const URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${props.page}&pageSize=${props.pageSize}`;
    setisloading(true);
    let data = await fetch(URL);
    let parsedData = await data.json();
    console.log(parsedData);
      setarticles(parsedData.articles);
      setotalResults(parsedData.totalResults);
      setisloading(false);

      props.setProgress(100)
  }

  useEffect(() => {
    document.title = `${CapitlizeFirstLetter(props.category)}-NewsMonkey`;
    updateNews();
  }, [])
  
    
  



  const fetchMoreData = async () => {
    setpage(page + 1);
    let URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    let data = await fetch(URL);
    let parsedData = await data.json();
    setarticles(articles.concat(parsedData.articles));
    setotalResults(parsedData.totalResults);
    setisloading(false);
  };

    if (isloading === true) {
      return <p>...Loading</p>;
    } else {
      return (
        <>
        
          <h1 className="text-center" style={{marginTop:"90px"}}>
            NewsMonkey-Top {props.category} Headlines
          </h1>
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<h4>Loading...</h4>}
          >
            <div className="container">
            <div className="row my-3">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItems
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
              )
              })}
            </div>
            </div>
          </InfiniteScroll>
          
          </>
      );
    }
}

export default News;

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
