/**
 * Created by ashi on 2014-12-16.
 */

var ShaderPrograms = {};

ShaderPrograms.attribs = [new VertexAttrib("inPosition", 0, 3), new VertexAttrib("inColor", 1, 4)];
ShaderPrograms.nattribs = [new VertexAttrib("inPosition", 0, 3), new VertexAttrib("inColor", 1, 4), new VertexAttrib("inNormal", 2, 3)];

ShaderPrograms.initPrograms = function() {

    var vertexScript =
        "attribute vec3 inPosition;\n" +
        "attribute vec4 inColor;\n" +
        "uniform mat4 uPMatrix;\n" +
        "uniform mat4 uVMatrix;\n" +
        "varying vec4 passColor;\n" +
        "void main(void) {\n" +
        "    gl_Position = uPMatrix * uVMatrix * vec4(inPosition, 1.0);\n" +
        "    passColor = inColor;\n" +
        "}";

    var fragmentScript =
        "precision mediump float;\n" +
        "varying vec4 passColor;\n" +
        "void main(void) {\n" +
        "    gl_FragColor = passColor;\n" +
        "}";

    var lVertexScript =
        "attribute vec3 inPosition;\n" +
        "attribute vec4 inColor;\n" +
        "attribute vec3 inNormal;\n" +
        "uniform mat4 uPMatrix;\n" +
        "uniform mat4 uVMatrix;\n" +
        "uniform mat4 uMVMatrix;\n" +
        "varying vec4 passColor;\n" +
        "varying vec3 passNormal;\n" +
        "void main(void) {\n" +
        "    gl_Position = uPMatrix * uMVMatrix * vec4(inPosition, 1.0);\n" +
        "    passColor = inColor;\n" +
        "    passNormal = normalize((uMVMatrix * vec4(inNormal, 0.0)).xyz);\n" +
        "}";

    var lFragmentScript =
        "precision mediump float;\n" +
        "uniform vec3 ambientLight;\n" +
        "uniform vec3 directionalLight;\n" +
        "uniform vec3 lightDirection;\n" +
        "varying vec4 passColor;\n" +
        "varying vec3 passNormal;\n" +
        "void main(void) {\n" +
        "    float diffuseFactor = max(0.0, -dot(passNormal, lightDirection));\n" +
        "    gl_FragColor = vec4((ambientLight + directionalLight * diffuseFactor) * passColor.rgb, passColor.a);\n" +
        "}";


    ShaderPrograms.defaultProgram = new ShaderProgram(initShader(vertexScript, gl.VERTEX_SHADER), initShader(fragmentScript, gl.FRAGMENT_SHADER), ShaderPrograms.attribs);
    ShaderPrograms.lightingProgram = new ShaderProgram(initShader(lVertexScript, gl.VERTEX_SHADER), initShader(lFragmentScript, gl.FRAGMENT_SHADER), ShaderPrograms.nattribs);
};
