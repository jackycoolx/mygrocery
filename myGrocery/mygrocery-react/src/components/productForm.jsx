import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getProduct, saveProduct } from "../services/productService";

class ProductForm extends Form {
  state = {
    data: {
      barcode: "",
      brand: "",
      name: ""
    },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    barcode: Joi.number()
      .required()
      .min(10000)
      .label("Barcode"),
    brand: Joi.string()
      .required()
      .min(5)
      .label("Product Brand"),
    name: Joi.string()
      .required()
      .min(5)
      .label("Product Name")
  };

  async populateProduct() {
    try {
      const productId = this.props.match.params.id;
      if (productId === "new") return;

      const { data: product } = await getProduct(productId);
      this.setState({ data: this.mapToViewModel(product) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateProduct();
  }

  mapToViewModel(product) {
    return {
      _id: product._id,
      barcode: product.barcode,
      brand: product.brand,
      name: product.name
    };
  }

  doSubmit = async () => {
    await saveProduct(this.state.data);

    this.props.history.push("/products");
  };

  render() {
    return (
      <div>
        <h1>Product Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("barcode", "Barcode", "number")}
          {this.renderInput("brand", "Product Brand")}
          {this.renderInput("name", "Product Name")}
          {this.renderButton("Save")}
          {this.renderCancelButton()}
        </form>
      </div>
    );
  }
}

export default ProductForm;
