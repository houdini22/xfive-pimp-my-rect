import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import ColorPicker from 'material-ui-color-picker'
import { Slider, Badge } from 'material-ui'

export class RectForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    currentItem: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.renderNewColorPicker()
  }

  renderNewColorPicker () {
    const { dispatch, change } = this.props

    this.ColorPicker = createReactClass({
      render () {
        return (
          <ColorPicker
            defaultValue='#000000'
            value='#000000'
            floatingLabelText='Background Color'
            onChange={(value) => {
              dispatch(change('backgroundColor', value))
            }}
          />
        )
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    const { currentItem, dispatch, change } = nextProps
    const oldItem = this.props.currentItem
    /**
     * This is fixing bug of color picker - value isn't update with new prop value.
     */
    if (currentItem.touched === false) {
      this.renderNewColorPicker()
      nextProps.currentItem.touched = true

      Object.keys(currentItem).forEach((key) => {
        if (currentItem[key] !== oldItem[key]) { // changes only
          dispatch(change(key, currentItem[key]))
        }
      })
    }
  }

  render () {
    const { handleSubmit, currentItem } = this.props
    const ColorPicker = this.ColorPicker

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <ColorPicker />
          <Field
            name='backgroundColor'
            component={({ input, label, meta: { touched, error }, ...custom }) => {
              return <input type='hidden' {...input} {...custom} />
            }}
          />
        </div>
        <div>
          <div>
            <div>
              Size
              <Badge
                badgeContent={currentItem.size}
                primary
              />
            </div>
          </div>
          <Slider
            onChange={(e, value) => {
              this.props.dispatch(this.props.change('size', value))
            }}
            value={currentItem.size}
            defaultValue={currentItem.size}
            format={null}
            min={1}
            max={200}
            step={1}
          />
          <Field
            name='size'
            label='Size'
            component={({ input, label, meta: { touched, error }, ...custom }) => {
              return (
                <div>
                  <input type='hidden' {...input} {...custom} />
                </div>
              )
            }}
          />
        </div>
        <div>
          <div>
            <div>
              Border Radius
              <Badge
                badgeContent={currentItem.borderRadius}
                primary
              />
            </div>
          </div>
          <Slider
            onChange={(e, value) => {
              this.props.dispatch(this.props.change('borderRadius', value))
            }}
            defaultValue={Math.min(Math.ceil(currentItem.size / 2), currentItem.borderRadius)}
            value={Math.min(Math.ceil(currentItem.size / 2), currentItem.borderRadius)}
            format={null}
            min={0}
            max={Math.ceil(currentItem.size / 2)}
            step={1}
          />
          <Field
            name='borderRadius'
            label='Border Radius'
            component={({ input, label, meta: { touched, error }, ...custom }) => {
              return (
                <div>
                  <input type='hidden' {...input} {...custom} />
                </div>
              )
            }}
          />
        </div>
      </form>
    )
  }
}

export default RectForm
