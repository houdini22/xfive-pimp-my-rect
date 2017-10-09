import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import RectForm from '../components/RectForm'
import { updateCurrentItem, initialValues } from '../../../store/rectangles'

const FORM_NAME = 'rect'

/*
const validate = (values) => {
  const requiredFields = [
    'backgroundColor',
    'size',
    'borderRadius'
  ]

  const errors = {}

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  console.log(values)

  return errors
}
 */

const onSubmit = (values, dispatch) => {
  console.log(values)
}

const onChange = (values, dispatch) => {
  dispatch(updateCurrentItem({
    ...values,
    touched: true
  }))
}

const _reduxForm = reduxForm({
  form: FORM_NAME,
  // validate,
  onSubmit,
  onChange,
  initialValues,
})(RectForm)

const selector = formValueSelector(FORM_NAME)

export default connect(state => {
  const { backgroundColor, size, borderRadius } = selector(state, 'backgroundColor', 'size', 'borderRadius')
  return {
    backgroundColor,
    size,
    borderRadius
  }
})(_reduxForm)
