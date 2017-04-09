import Header from '../components/Header'
import { Link } from '../routes'
import 'isomorphic-fetch'

export default class Article extends React.Component {
  static async getInitialProps({query, jsonPageRes}) {
    console.time("Fetching article")
    const res = await fetch(`http://localhost:3000/api/article/${query.id}`)
    console.timeEnd("Fetching article")
    return await res.json()
  }
  render() {
    const id = parseInt(this.props.id, 10)
    return <div>
      <Header/>
      <Link route="article" params={{id: id - 1}}>
        <a>Prev</a>
      </Link>
      |
      <Link route="article" params={{id: id + 1}}>
        <a>Next</a>
      </Link>
      <h1>ID: {this.props.id}</h1>
      <p>{this.props.body}</p>
    </div>
  }
}
