import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="menu"><Link to={'/product/category/' + item._id}>{item.name}</Link></li>
      );
    });
    return (
      <div className="py-5">
        <div className="flex items-center justify-between gap-6">
          <div className="logo">
            <img className='w-28 h-10' src="https://theme.hstatic.net/1000356936/1001159389/14/logo.png?v=6" alt="" />
          </div>
          <div className="float-left">
            <ul className="menu">
            <li className="menu"><Link to='/'>Home</Link></li>
              {cates}
            </ul>
          </div>
          <div className="float-right">
            <form className="search">
              <input className="py-2 px-4 shadow-xl w-[200px] rounded " type="search" placeholder="Enter keyword"  value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
              <input className='bg-blue-500 rounded py-2 px-4 text-white cursor-pointer' type="submit" value="SEARCH" onClick={(e) => this.btnSearchClick(e)} />
            </form>
        </div>
        </div>
       
        <div className="float-clear" />
      </div>
    );
  }
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default withRouter(Menu);