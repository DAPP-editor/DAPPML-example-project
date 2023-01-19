import {
  ASTNode,
  ASTNodeType,
  Application,
  ArrayNode,
  BooleanNode,
  Component,
  ComponentAttribute,
  ComponentAttributeName,
  ComponentAttributeType,
  ComponentBody,
  ComponentName,
  FunctionNode,
  NullNode,
  NumberNode,
  ObjectNode,
  StringNode,
  Tag,
  TagArgument,
  TagArgumentName,
  TagArgumentValue,
  TagBody,
  TagName,
  UndefinedNode,
} from "./Node";
import { Visitor } from "./Visitor";

export class DebugVisitor extends Visitor {
  public visit(node: ASTNode) {
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
      case ASTNodeType.ComponentName:
        this.visitComponentName(node as ComponentName);
        break;
      case ASTNodeType.Tag:
        this.visitTag(node as Tag);
        break;
      case ASTNodeType.TagName:
        this.visitTagName(node as TagName);
        break;
      case ASTNodeType.TagBody:
        this.visitTagBody(node as TagBody);
        break;
      case ASTNodeType.TagArgument:
        this.visitTagArgument(node as TagArgument);
        break;
      case ASTNodeType.TagArgumentName:
        this.visitTagArgumentName(node as TagArgumentName);
        break;
      case ASTNodeType.TagArgumentValue:
        this.visitTagArgumentValue(node as TagArgumentValue);
        break;
      case ASTNodeType.String:
        this.visitString(node as StringNode);
        break;
      case ASTNodeType.Number:
        this.visitNumber(node as NumberNode);
        break;
      case ASTNodeType.Boolean:
        this.visitBoolean(node as BooleanNode);
        break;
      case ASTNodeType.Null:
        this.visitNull(node as NullNode);
        break;
      case ASTNodeType.Undefined:
        this.visitUndefined(node as UndefinedNode);
        break;
      case ASTNodeType.Object:
        this.visitObject(node as ObjectNode);
        break;
      case ASTNodeType.Array:
        this.visitArray(node as ArrayNode);
        break;
      case ASTNodeType.Function:
        this.visitFunction(node as FunctionNode);
        break;
    }
    node.accept(this);
    this.postVisit(node);
  }

  public visitApplication(node: Application) {
    console.log("visiting Application");
  }
  public visitComponent(node: Component) {
    console.log("visiting Component");
  }
  public visitComponentAttribute(node: ComponentAttribute) {
    console.log("visiting ComponentAttribute");
  }
  public visitComponentAttributeName(node: ComponentAttributeName) {
    console.log("visiting ComponentAttributeName");
  }
  public visitComponentAttributeType(node: ComponentAttributeType) {
    console.log("visiting ComponentAttributeType");
  }
  public visitComponentBody(node: ComponentBody) {
    console.log("visiting ComponentBody");
  }
  public visitComponentName(node: ComponentName) {
    console.log("visiting ComponentName");
  }
  public visitTag(node: Tag) {
    console.log("visiting Tag");
  }
  public visitTagName(node: TagName) {
    console.log("visiting TagName");
  }
  public visitTagBody(node: TagBody) {
    console.log("visiting TagBody");
  }
  public visitTagArgument(node: TagArgument) {
    console.log("visiting TagArgument");
  }
  public visitTagArgumentName(node: TagArgumentName) {
    console.log("visiting TagArgumentName");
  }
  public visitTagArgumentValue(node: TagArgumentValue) {
    console.log("visiting TagArgumentValue");
  }
  public visitString(node: StringNode) {
    console.log("visiting String");
  }
  public visitNumber(node: NumberNode) {
    console.log("visiting Number");
  }
  public visitBoolean(node: BooleanNode) {
    console.log("visiting Boolean");
  }
  public visitNull(node: NullNode) {
    console.log("visiting Null");
  }
  public visitUndefined(node: UndefinedNode) {
    console.log("visiting Undefined");
  }
  public visitObject(node: ObjectNode) {
    console.log("visiting Object");
  }
  public visitArray(node: ArrayNode) {
    console.log("visiting Array");
  }
  public visitFunction(node: FunctionNode) {
    console.log("visiting Function");
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
