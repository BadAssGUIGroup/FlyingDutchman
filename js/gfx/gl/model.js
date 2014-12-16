/**
 * Created by ashi on 2014-12-16.
 */

function Model(geometry, scale) {
    this.geometry = geometry;
    this.scale = scale || vec3.set(vec3.create(), 1, 1, 1);
    this.modelMatrix = mat4.create();
    this.modelViewMatrix = mat4.create();
}

Model.prototype.render = function(viewMatrix, program) {
    mat4.multiply(this.modelViewMatrix, viewMatrix, this.modelMatrix);
    mat4.scale(this.modelViewMatrix, this.modelViewMatrix, this.scale);
    program.use();
    program.setUniformMatrix4("uVMatrix", viewMatrix);
    program.setUniformMatrix4("uMVMatrix", this.modelViewMatrix);
    this.geometry.render();
};