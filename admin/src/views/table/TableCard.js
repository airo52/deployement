import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
//import { Button } from "react-bootstrap";
import paginationFactory from "react-bootstrap-table2-paginator";


const { SearchBar } = Search;





const TableCard = ({products,columns,title})=>{


      return (
        <div>
          <h4 style={{marginTop:"20px",textTransform:"uppercase"}}><i>{title}</i></h4>
          <ToolkitProvider
            bootstrap4
            keyField="name"
            data={products}
            columns={columns}
            search
          >
            {props => (
              <div>
                  <div style={{float:"right"}}>
                <SearchBar
                  {...props.searchProps}
                  style={{right:"0",
                   width: "80%", height: "40px",
                   float:"right"
                 }}
                />
                </div>
               
                <BootstrapTable
                  {...props.baseProps}
                  filter={filterFactory()}
                  noDataIndication={<center>No Data Available</center>}
                  striped
                  hover
                  condensed
                  pagination={paginationFactory({ sizePerPage: 10 })}
                  wrapperClasses="table-responsive"
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
      );


}

export default TableCard;