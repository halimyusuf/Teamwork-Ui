import React, { Component } from "react";
import { toast } from "react-toastify";
import CreateBtn from "./createBtn";
import PostList from "./postList";
import Search from "./common/searchPost";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import { desc, asc } from "../utils/sorting";
import {
  getAllPosts,
  deleteArticle,
  reportArticleSpam,
  reportGifSpam,
  deleteGif
} from "../services/postsServices";

class Home extends Component {
  state = {
    allPosts: [],
    pageSize: 10,
    currentPage: 1,
    sortColumn: [{ by: "title" }, { by: "date" }],
    sortOrder: "desc",
    currSort: { by: "date" },
    search: "",
    type: ""
  };

  async componentDidMount() {
    try {
      const response = await getAllPosts();
      this.setState({
        allPosts: response.data.data
      });
    } catch (error) {
      // const { response: err } = error;
      toast.error("Unexpected error");
    }
  }

  handleDel = async (id, arg) => {
    try {
      const posts = [...this.state.allPosts];
      let allPosts;
      if (arg === "article") {
        await deleteArticle(id);
        allPosts = posts.filter(p => p.content && p.id !== id);
      } else {
        await deleteGif(id);
        allPosts = posts.filter(p => p.url && p.id !== id);
      }
      this.setState({
        allPosts
      });
    } catch (error) {
      toast.error("Post has already been deleted");
    }
  };

  handleFlag = async (id, arg) => {
    try {
      if (arg === "article") await reportArticleSpam(id);
      else await reportGifSpam(id);
      const response = await getAllPosts();
      this.setState({
        allPosts: response.data.data
      });
    } catch (error) {
      toast.error("Post has already been deleted");
    }
  };

  handlePag = page => {
    this.setState({
      currentPage: page
    });
  };

  handleSort = currSort => {
    const index = currSort.nativeEvent.target.selectedIndex;
    const current = currSort.nativeEvent.target[index].value;

    this.setState({
      currSort: { by: current }
    });
  };

  handleType = type => {
    this.setState({
      type
    });
  };

  handleSearch = ({ currentTarget: input }) => {
    const search = input.value;
    this.setState({
      search,
      currentPage: 1
    });
  };

  renderPosts() {
    const { pageSize, currentPage, search, currSort, sortOrder } = this.state;
    const { user } = this.props;
    let { allPosts } = this.state;
    if (this.props.match.path === "/spam")
      allPosts = allPosts.filter(post => post.spam > 0);
    if (this.state.type === "gif") allPosts = allPosts.filter(post => post.url);
    if (this.state.type === "article")
      allPosts = allPosts.filter(post => post.content);
    else if (this.props.match.params && this.props.match.params.username)
      allPosts = allPosts.filter(post => post.authorId === user.id);
    const matchedPosts = allPosts.filter(post => {
      return post.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    if (currSort.by.length !== 0 && matchedPosts.length > 0) {
      if (sortOrder === "asc") matchedPosts.sort(asc(currSort.by));
      else if (sortOrder === "desc") matchedPosts.sort(desc(currSort.by));
    }

    const posts = paginate(matchedPosts, currentPage, pageSize);
    return { totalCount: matchedPosts.length, posts };
  }

  handleSortOrder = e => {
    const sortOrder = e.target.className.split("-")[2].split(" ")[0];
    this.setState({
      sortOrder
    });
  };

  renderSelectSort = () => {
    const { sortOrder, sortColumn } = this.state;
    const ascSortClass = "fa fa-sort-asc";
    const descSortClass = "fa fa-sort-desc";
    const ascSort =
      sortOrder === "asc" ? ascSortClass + " sortBackground" : ascSortClass;

    const descSort =
      sortOrder === "desc" ? descSortClass + " sortBackground" : descSortClass;
    return (
      <div>
        <select onChange={this.handleSort} name="sort" id="sort">
          <option value="">Sort By</option>
          {sortColumn.map(row => (
            <option key={row.by} value={row.by}>
              {row.by}
            </option>
          ))}
        </select>
        <i onClick={this.handleSortOrder} className={ascSort}></i>
        <i onClick={this.handleSortOrder} className={descSort}></i>
      </div>
    );
  };

  render() {
    const { pageSize, currentPage, search, type } = this.state;
    const { user } = this.props;
    const { totalCount, posts } = this.renderPosts();
    const isPageSpam = this.props.match.path === "/spam" ? false : true;
    return (
      <div className="home-left">
        <CreateBtn></CreateBtn>
        <div className="home-top">
          <Search value={search} onChange={this.handleSearch} />
          <div className="sort">{this.renderSelectSort()}</div>
        </div>
        <div className="type-filter">
          <p
            className={type === "" ? "type-filter-active" : ""}
            onClick={() => this.handleType("")}
          >
            All
          </p>
          <p
            className={type === "gif" ? "type-filter-active" : ""}
            onClick={() => this.handleType("gif")}
          >
            Gif
          </p>
          <p
            className={type === "article" ? "type-filter-active" : ""}
            onClick={() => this.handleType("article")}
          >
            Article
          </p>
        </div>
        <PostList
          handleFlag={this.handleFlag}
          handleDel={this.handleDel}
          allPosts={posts}
          spamPage={isPageSpam}
          user={user}
        />
        <Pagination
          size={pageSize}
          length={totalCount}
          currentPage={currentPage}
          handlePag={this.handlePag}
        ></Pagination>
      </div>
    );
  }
}

export default Home;
