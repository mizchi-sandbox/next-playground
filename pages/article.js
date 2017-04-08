import Header from '../components/Header'

export default class Index extends React.Component {
  render() {
    return <div>
      <Header/>
      <span>ID: {this.props.id}</span>
    </div>
  }
}
