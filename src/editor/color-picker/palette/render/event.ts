/**
 * @author 翠林
 * @deprecated 绑定事件
 */

import Palette from '..'
import drag from '../../util/drag'

export default function bindEvent(palette: Palette) {
    const $refs = palette.$el.$refs()

    // 拖拽绑定 - 色度
    drag($refs.hue, function ({ y, h }) {
        palette.forward = true
        palette.data.mh = h
        palette.data.h = y
    })

    // 拖拽绑定 - 饱和度、纯度
    drag($refs.sv, function ({ x, y, w, h }) {
        palette.forward = true
        palette.data.s = x
        palette.data.v = h - y
        palette.data.ms = w
        palette.data.mv = h
    })

    // 拖拽绑定 - 透明度
    drag($refs.alpha, function ({ x, w }) {
        palette.forward = true
        palette.data.a = x
        palette.data.ma = w
    })

    // 输入绑定
    $refs.input.on('blur', function (e: FocusEvent) {
        let value = (e.target as HTMLInputElement).value.trim()
        palette.analyseValue(value)
    })

    $refs.input.on('keydown', function (e: KeyboardEvent) {
        if (e.keyCode === 13) {
            let value = (e.target as HTMLInputElement).value.trim()
            palette.analyseValue(value)
        }
    })

    // 切换输出值的模式
    $refs.pattern.on('click', function () {
        let index = palette.pattern.indexOf(palette.data.pattern) + 1
        if (index >= palette.pattern.length) {
            index = 0
        }
        palette.forward = true
        palette.data.pattern = palette.pattern[index]
    })

    const picker = palette.picker

    // 取消
    $refs.cancel.on('click', function () {
        picker.hide()
        picker.config.cancel(palette.data.value)
    })

    // 确定
    $refs.done.on('click', function () {
        picker.hide()
        picker.record(palette.data.value)
        picker.config.done(palette.data.value)
    })
}
