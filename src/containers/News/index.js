import "./index.css";

import React from "react";
import { createResource as createDataFetcher } from "simple-cache-provider";

import { Link } from '../../components/Router';
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
    const { news } = this.state;
    news.length = 99;

    return (
      <div className="row">
        {news.map(this.renderItem)}
      </div>
    );
  }

  renderItem = (nws, index) => (
    <div key={`nws.${index}`} className="col-4">
      <div className="card-item fade-in-up">
        <Link className="card-item-link" to={`/${nws.id}`}>
          <img
            alt="sample dummy"
            className="card-item-image"
            src="https://dummyimage.com/530x200/424242/ffffff&text=PST"
          />
          <h2 className="card-item-title block-ellipsis-three-lines">{nws.title}</h2>
          <p className="card-item-body block-ellipsis-three-lines">{nws.body}</p>
        </Link>
      </div>
    </div>
  );
}

export default withCache(News);