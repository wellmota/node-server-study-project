import { Readable } from "node:stream"
import fetch from "node-fetch"

class OneToHundredStream extends Readable {
  index = 1
  _read() {
    const i = this.index++
    if (i > 5) {
      this.push(null)
    } else {
      const buf = Buffer.from(String(i))
      this.push(buf)
    }
    setTimeout(() => {}, 1000)
  }
}

fetch("http://localhost:3334", {
  method: "POST",
  body: new OneToHundredStream(),
})
  .then((response) => {
    return response.text()
  })
  .then((data) => {
    console.log(data)
  })
