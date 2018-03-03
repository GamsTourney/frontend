import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  FormGroup,
  FormControl,
  Panel,
  Row,
  Col,
  Button
} from 'react-bootstrap'
import { Redirect } from 'react-router'
import { setPassword } from './dux'

class Login extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      password: '',
      redirect: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.actions.setPassword(this.state.password)
    if (this.state.password === process.env.ADMIN_PASSWORD) {
      this.setState({ redirect: true })
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirect } = this.state

    if (redirect === true) {
      return <Redirect to={from} />
    }

    return (
      <Row>
        <Col xs={0} md={3} />
        <Col xs={12} md={6}>
          <Panel bsStyle="primary">
            <Panel.Heading>Login</Panel.Heading>
            <Panel.Body>
              <form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <FormControl
                    type="password"
                    value={this.state.value}
                    placeholder="Admin Password Required"
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
              </form>
              <Button
                type='submit'
                bsStyle='primary'
                bsSize='small'
                className='pull-right'
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </Panel.Body>
          </Panel>
        </Col>
        <Col xs={0} md={3} />
      </Row>

    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setPassword
    }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Login)
