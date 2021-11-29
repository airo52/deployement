import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Button } from "react-bootstrap";

const { SearchBar } = Search;

let nameFilter;
let priceFilter;
let stockFilter;
let originFilter;

const ClearButton = props => {
  const handleClick = () => {
    props.onSearch("");
    props.clearAllFilter();
  };
  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      style={{
        fontSize: "16px",
        padding: "5px",
        margin: "10px",
        height: "40px"
      }}
    >
      Clear
    </Button>
  );
};

class Tables extends React.Component {
  columns = [
    {
      dataField: "name",
      text: "Product Name",
      filter: textFilter({
        getFilter: filter => {
          nameFilter = filter;
        }
      })
    },
    {
      dataField: "price",
      text: "Price",
      filter: textFilter({
        getFilter: filter => {
          priceFilter = filter;
        }
      }),
      sort: true
    },
    {
      dataField: "stock",
      text: "Stock",
   
    },
    {
      dataField: "origin",
      text: "Origin",
      filter: textFilter({
        getFilter: filter => {
          originFilter = filter;
        }
      })
    },
    {
        dataField: "Action",
        text: "Action",
     
      }
  ];

  clearAllFilter() {
    nameFilter("");
    priceFilter("");
    originFilter("");
    stockFilter("");
  }

  products = [
    {
      name: "apple",
      price: 100,
      stock: 10,
      origin: "japan",
      Action:<button>Delete</button>

    },
    {
      name: "orange",
      price: 150,
      stock: 456,
      origin: "spain",
      Action:"<button>Delete</button>"
    },
    {
      name: "pineapple",
      price: 300,
      stock: 4,
      origin: "america",
      Action:"<button>Delete</button>"
    }
  ];

  render() {
    return (
      <div>
        <h1>Clear search bar and filter</h1>
        <ToolkitProvider
          bootstrap4
          keyField="name"
          data={this.products}
          columns={this.columns}
          search
        >
          {props => (
            <div>
              <SearchBar
                {...props.searchProps}
                style={{ width: "400px", height: "40px" }}
              />
              <ClearButton
                {...props.searchProps}
                clearAllFilter={this.clearAllFilter}
              />
              <BootstrapTable
                {...props.baseProps}
                filter={filterFactory()}
                noDataIndication="There is no solution"
                striped
                hover
                condensed
              />
            </div>
          )}
        </ToolkitProvider>
      </div>
    );
  }
}

export default Tables;
