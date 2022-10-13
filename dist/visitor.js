"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitor = void 0;
const JAVA_PREFIXES = ['java.', 'com.', 'co.', 'org.', 'net.', 'me.', 'io.'];
const visitor = (t, objectName = 'Java', propertyName = 'type') => ({
    ImportDeclaration(path) {
        const source = path.node.source.value;
        const identifiers = path.node.specifiers.map((item) => item.local.name);
        if (!JAVA_PREFIXES.some((item) => source.startsWith(item)))
            return;
        path.replaceWithMultiple(identifiers.map((item) => t.variableDeclaration('const', [
            t.variableDeclarator(t.identifier(item), t.callExpression(t.memberExpression(t.identifier(objectName), t.identifier(propertyName)), [
                t.stringLiteral(`${source}.${item}`),
            ])),
        ])));
    },
});
exports.visitor = visitor;
