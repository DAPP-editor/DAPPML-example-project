// @ts-nocheck
import { Lexer } from "./Lexer";
import { Visitor } from "./Visitor";

export enum ASTNodeType {
  Node = "Node",
  Application = "Application",
  Component = "Component",
  ComponentAttribute = "ComponentAttribute",
  ComponentAttributeName = "ComponentAttributeName",
  ComponentAttributeType = "ComponentAttributeType",
  ComponentBody = "ComponentBody",
  ComponentName = "ComponentName",
  Tag = "Tag",
  TagName = "TagName",
  TagBody = "TagBody",
  TagArgument = "TagArgument",
  TagArgumentName = "TagArgumentName",
  TagArgumentValue = "TagArgumentValue",
  String = "String",
  Number = "Number",
  Boolean = "Boolean",
  Null = "Null",
  Undefined = "Undefined",
  Object = "Object",
  Array = "Array",
  Function = "Function",
  FunctionAttribute = "FunctionAttribute",
  Definition = "Definition",
  FunctionCall = "FunctionCall",
}

export class ASTNode {
  public type: string;
  public constructor() {
    this.type = ASTNodeType.Node;
  }

  accept(visitor: Visitor) {
    console.log("ASTNode");
  }
}

export class Application extends ASTNode {
  public components: Component[];
  public constructor() {
    super();
    this.type = ASTNodeType.Application;
    this.components = [];
  }

  accept(visitor: Visitor) {
    for (let component of this.components) {
      visitor.visit(component);
    }
  }
}

export class Component extends ASTNode {
  public name: string;
  public attributes: ComponentAttribute[] = [];
  public body: ComponentBody;
  public definitions: Definition[] = [];

  public constructor(name: string) {
    super();
    this.type = ASTNodeType.Component;
    this.name = name;
    this.attributes = [];
    this.body = new ComponentBody();
  }

  accept(visitor: Visitor) {
    for (let component of this.attributes) {
      visitor.visit(component);
    }
    for (let definition of this.definitions) {
      visitor.visit(definition);
    }
    visitor.visit(this.body);
  }
}

export type DefinitionType = FunctionNode | ObjectNode | ArrayNode | FunctionCall;

export class Definition extends ASTNode {
  public name: string;
  public mutability: "let" | "const" | "function";
  public value: DefinitionType;

  public constructor() {
    super();
    this.type = ASTNodeType.Definition;
  }

  accept(visitor: Visitor) {
    visitor.visit(this.value);
  }
}

export class ComponentAttribute extends ASTNode {
  public name: ComponentAttributeName;
  public attributeType: ComponentAttributeType;

  public constructor(name: string, type: string) {
    super();
    this.type = ASTNodeType.ComponentAttribute;
    this.name = new ComponentAttributeName(name);
    this.attributeType = new ComponentAttributeType(type);
  }

  accept(visitor: Visitor) {
    visitor.visit(this.name);
    visitor.visit(this.attributeType);
  }
}

export class FunctionAttribute extends ComponentAttribute {
  public constructor(name: string, type: string) {
    super(name, type);
    this.type = ASTNodeType.FunctionAttribute;
  }
}

export class ComponentAttributeName extends ASTNode {
  public value: string;

  public constructor(name: string) {
    super();
    this.type = ASTNodeType.ComponentAttributeName;
    this.value = name;
  }

  accept(visitor: Visitor) {}
}

export class ComponentAttributeType extends ASTNode {
  public value: string;

  public constructor(type: string) {
    super();
    this.type = ASTNodeType.ComponentAttributeType;
    this.value = type;
  }

  accept(visitor: Visitor) {}
}

export class ComponentBody extends ASTNode {
  public tags: Tag[];

  public constructor() {
    super();
    this.type = ASTNodeType.ComponentBody;
    this.tags = [];
  }

  accept(visitor: Visitor) {
    for (let tag of this.tags) {
      visitor.visit(tag);
    }
  }
}

export class ComponentName extends ASTNode {
  public value: string;

  public constructor(name: string) {
    super();
    this.type = ASTNodeType.ComponentName;
    this.value = name;
  }

  accept(visitor: Visitor) {}
}

export class Tag extends ASTNode {
  public name: string;
  public arguments: TagArgument[];
  public body: TagBody;

  public constructor() {
    super();
    this.type = ASTNodeType.Tag;
    this.name = "";
    this.arguments = [];
    this.body = new TagBody();
  }

  accept(visitor: Visitor) {
    for (let argument of this.arguments) {
      visitor.visit(argument);
    }
    visitor.visit(this.body);
  }
}

export class TagName extends ASTNode {
  public value: string;

  public constructor(name: string) {
    super();
    this.type = ASTNodeType.TagName;
    this.value = name;
  }

  accept(visitor: Visitor) {}
}

export class TagBody extends ASTNode {
  public tags: Tag[];
  public text: string;

  public constructor() {
    super();
    this.type = ASTNodeType.TagBody;
    this.tags = [];
    this.text = "";
  }

  accept(visitor: Visitor) {
    for (let tag of this.tags) {
      visitor.visit(tag);
    }
  }
}

export class TagArgument extends ASTNode {
  public name: TagArgumentName;
  public value: TagArgumentValue;

  public constructor(name: string, value: string) {
    super();
    this.type = ASTNodeType.TagArgument;
    this.name = new TagArgumentName(name);
    this.value = new TagArgumentValue(new StringNode(value));
  }

  accept(visitor: Visitor) {
    visitor.visit(this.name);
    visitor.visit(this.value);
  }
}

export class TagArgumentName extends ASTNode {
  public value: string;

  public constructor(name: string) {
    super();
    this.type = ASTNodeType.TagArgumentName;
    this.value = name;
  }

  accept(visitor: Visitor) {}
}

type TagArgumentValueType =
  | Tag
  | StringNode
  | NumberNode
  | BooleanNode
  | NullNode
  | UndefinedNode
  | ObjectNode
  | ArrayNode
  | FunctionNode;

export class TagArgumentValue extends ASTNode {
  public value: TagArgumentValueType;

  public constructor(value: TagArgumentValueType) {
    super();
    this.type = ASTNodeType.TagArgumentValue;
    this.value = value;
  }

  accept(visitor: Visitor) {}
}

export class StringNode extends ASTNode {
  public value: string;

  public constructor(value: string) {
    super();
    this.type = ASTNodeType.String;
    this.value = value;
  }

  accept(visitor: Visitor) {}
}

export class NumberNode extends ASTNode {
  public value: number;

  public constructor(value: number) {
    super();
    this.type = ASTNodeType.Number;
    this.value = value;
  }

  accept(visitor: Visitor) {}
}

export class BooleanNode extends ASTNode {
  public value: boolean;

  public constructor(value: boolean) {
    super();
    this.type = ASTNodeType.Boolean;
    this.value = value;
  }

  accept(visitor: Visitor) {}
}

export class NullNode extends ASTNode {
  public constructor() {
    super();
    this.type = ASTNodeType.Null;
  }

  accept(visitor: Visitor) {}
}

export class UndefinedNode extends ASTNode {
  public constructor() {
    super();
    this.type = ASTNodeType.Undefined;
  }
  accept(visitor: Visitor) {}
}

export class ObjectNode extends ASTNode {
  public value: string;

  public constructor(value: any) {
    super();
    this.type = ASTNodeType.Object;
    this.value = value;
  }

  accept(visitor: Visitor) {}
}

export class ArrayNode extends ASTNode {
  public value: any[];

  public constructor(value: any[]) {
    super();
    this.type = ASTNodeType.Array;
    this.value = value;
  }

  accept(visitor: Visitor) {}
}

export class FunctionNode extends ASTNode {
  public attributes: FunctionAttribute[] = [];
  public body: string = "";
  public constructor() {
    super();
    this.type = ASTNodeType.Function;
  }

  accept(visitor: Visitor) {}
}

export class FunctionCall extends ASTNode {
  public functionName: string[] = [];
  public arguments: Array<string | string[]> = [];
  public constructor() {
    super();
    this.type = ASTNodeType.FunctionCall;
  }

  accept(visitor: Visitor) {}
}
