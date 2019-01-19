import React, { Component } from "react";
import Table from "./common/table";

class ProductsTable extends Component {
  columns = [
    { path: "barcode", label: "Barcode" },
    { path: "brand", label: "Brand" },
    { path: "name", label: "Name" },
    {
      key: "edit",
      content: product => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => this.props.onEdit(product)}
        >
          Edit
        </button>
      )
    }
  ];

  render() {
    const { products, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={products}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ProductsTable;
