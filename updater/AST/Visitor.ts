import {
  ASTNode,
  ASTNodeType,
  Application,
  Component,
  ComponentAttribute,
  ComponentAttributeName,
  ComponentAttributeType,
  ComponentBody,
} from "./Node";

export class Visitor {
  indent = 0;
  visit(node: ASTNode) {
    this.preVisit(node);
    switch (node.type) {
      case ASTNodeType.Application:
        this.visitApplication(node as Application);
        break;
      case ASTNodeType.Component:
        this.visitComponent(node as Component);
        break;
      case ASTNodeType.ComponentAttribute:
        this.visitComponentAttribute(node as ComponentAttribute);
        break;
      case ASTNodeType.ComponentAttributeName:
        this.visitComponentAttributeName(node as ComponentAttributeName);
        break;
      case ASTNodeType.ComponentAttributeType:
        this.visitComponentAttributeType(node as ComponentAttributeType);
        break;
      case ASTNodeType.ComponentBody:
        this.visitComponentBody(node as ComponentBody);
        break;

      default:
        break;
    }
    node.accept(this);
    this.postVisit(node);
  }

  visitApplication(node: Application) {
    //console.log(node);
  }

  visitComponent(node: Component) {
    //console.log(node);
  }

  visitComponentAttribute(node: ComponentAttribute) {
    //console.log(node);
  }

  visitComponentAttributeName(node: ComponentAttributeName) {
    //console.log(node);
  }

  visitComponentAttributeType(node: ComponentAttributeType) {
    //console.log(node);
  }

  visitComponentBody(node: ComponentBody) {
    //console.log(node);
  }

  preVisit(node: ASTNode) {
    console.log("node.type: " + "    ".repeat(this.indent) + node.type + "");
    this.indent += 1;
  }

  postVisit(node: ASTNode) {
    this.indent -= 1;
    //console.log(node);
  }
}
