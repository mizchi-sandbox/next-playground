import Link from 'next/link'
import Header from '../components/Header'

export default class Index extends React.Component {
  static async getInitialProps() {
    console.log('getInitialProps')
    const res = await fetch('https://api.github.com/repos/zeit/next.js')
    const data = await res.json()
    return data
  }

  render() {
    return <div>
      <Header/>
      Welcome to next.js! {this.props.stargazers_count}
      <div>Hello World. <Link href='/about'><a>About</a></Link></div>
    </div>

  }
}
