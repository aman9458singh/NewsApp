import React, { Component } from "react";
import NewsItems from "./NewsItems";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      isloading: true,
      page: 1,
    };
  }

  async updateNews() {
    let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b2096725570542a390bfdcab6b11e191&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ isloading: true });
    let data = await fetch(URL);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      isloading: false,
    });
  }

  async componentDidMount() {
    // let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b2096725570542a390bfdcab6b11e191&page=1&pageSize=${this.props.pageSize}`;

    // let data = await fetch(URL);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   isloading: false,
    // });
    this.updateNews()
  }

  handlePrevClick = async () => {
    //  console.log("previous");
    //  let URL =
    //       `https://newsapi.org/v2/top-headlines?country=${this.props.country}&categoryy=${this.props.category}&apiKey=b2096725570542a390bfdcab6b11e191&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;

    //     let data = await fetch(URL);
    //     let parsedData = await data.json();
    //     this.setState({
    //       page:this.state.page-1,
    //       articles: parsedData.articles,
    //     })
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    //   console.log("next");
    //    if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    //    }else{
    //   let URL =
    //     `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b2096725570542a390bfdcab6b11e191&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //     let data = await fetch(URL);
    //   let parsedData = await data.json();
    //   this.setState({
    //     page:this.state.page+1,
    //     articles: parsedData.articles,
    //   })
    // }
    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();
  };

  render() {
    if (this.state.isloading === true) {
      return <p>...Loading</p>;
    } else {
      return (
        <div className="container my-4">
          <h1 className="text-center">NewsMonkey-Top Headlines</h1>

          <div className="row my-3">
            {this.state.articles.map((element) => {
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
              );
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePrevClick}
            >
              &larr;previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      );
    }
  }
}

export default News;
