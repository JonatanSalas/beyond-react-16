import "./index.css";

import React from "react";
import { createResource as createDataFetcher } from "simple-cache-provider";

import Placeholder from "../../components/Timeout";
import withCache from "../../hocs/withCache";

const newsFetcher = createDataFetcher(async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  return await res.json();
});

class News extends React.PureComponent {
  static getDerivedStateFromProps = (nextProps, prevState) => ({
    news: newsFetcher(nextProps.cache)
  });

  state = {
    news: []
  };

  render() {
    this.state.news.length = 99;

    return (
      <Placeholder ms={450}>
        <div className="row">
          {this.state.news.map(this.renderItem)}
        </div>
      </Placeholder>
    );
  }

  renderItem = (nws, index) => (
    <div key={`nws.${index}`} className="col-4">
      <div className="card-item fade-in-up">
        <img
          alt="sample dummy"
          className="card-item-image"
          src="https://dummyimage.com/530x200/424242/ffffff&text=PST"
        />
        <h2 className="card-item-title block-ellipsis-three-lines">{nws.title}</h2>
        <p className="card-item-body block-ellipsis-three-lines">{nws.body}</p>
      </div>
    </div>
  );
}

export default withCache(News);