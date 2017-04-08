import Link from 'next/link'
import Header from '../components/Header'
import range from 'lodash.range'

export default class Scroll extends React.Component {
  render() {
    return <div>
      <Header/>
      <ul>
        {
          range(100).map(i => {
            return <li key={i}>
              item: {i}
            </li>
          })
        }
      </ul>

    </div>
  }
}
