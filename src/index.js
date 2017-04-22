import vertShaderSource from '!raw-loader!./test_vertex_shader_1.glsl'
import fragShaderSource from '!raw-loader!./test_fragment_shader_1.glsl'

function createShader(gl, type, source) {
    let shader = gl.createShader(type)

    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)

    if (success) {
        return shader
    }

    console.log(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
}

function createProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    let success = gl.getProgramParameter(program, gl.LINK_STATUS)

    if (success) {
        return program
    }

    console.log(gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
}

function start() {
    let canvas = document.getElementById('glCanvas')
    let gl = canvas.getContext('webgl')

    let vertShader = createShader(gl, gl.VERTEX_SHADER, vertShaderSource)
    let fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragShaderSource)
    // console.log(vertShader)

    let program = createProgram(gl, vertShader, fragShader)

    let positionAttributeLocation = gl.getAttribLocation(program, 'a_position')

    let positionBuffer = gl.createBuffer()

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    let position = [
        0, 0,
        0, 0.5,
        0.7, 0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW)

    /* Render code, maybe put in loop */
    gl.viewport(0, 0, 480, 640)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)

    gl.enableVertexAttribArray(positionAttributeLocation)

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    let size = 2;
    let type = gl.FLOAT;
    let normalize = false;
    let stride = 0;
    let offset = 0;

    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)

    let primativeType = gl.TRIANGLES
    let aOffset = 0;
    let count = 3;

    gl.drawArrays(primativeType, aOffset, count)
}

start()

window.addEventListener('load', start);
