const data = require('./file.json')

function getKeys (map, val) {
  const result = []
  map.forEach((value, key) => {
    if (value === val) {
      result.push(key)
    }
  })
  return result
}

function printArray (arr) {
  for (const i of arr) {
    console.log(i)
  }
}

function compute () {
  const ipAddressMap = new Map()
  const epocMap = new Map()
  const ips = [0, 0, 0]
  const ipKeys = []

  let temp
  for (const i of data) {
    // Processing the IPAddresses
    temp = ipAddressMap.get(i.ip_address)
    if (temp === undefined) {
      ipAddressMap.set(i.ip_address, i.upbytes)
    } else {
      ipAddressMap.set(i.ip_address, temp + i.upbytes)
    }

    // Processing EPOC
    epocMap.set(i.EPOC, i.upbytes + i.downbytes)
  }
  // console.log('ipAddressMap - ', ipAddressMap)
  // console.log('epocMap - ', epocMap)

  console.log('Total upbytes per IpAddress')
  ipAddressMap.forEach((value, key) => {
    console.log('    ', key, ' - ', value)

    if (value > ips[0]) {
      if (ips[0] !== 0) {
        ips[1] = ips[0]
        ips[2] = ips[1]
      }
      ips[0] = value
      ipKeys[0] = key
    } else if (value > ips[1]) {
      if (ips[1] !== 0) {
        ips[2] = ips[1]
      }
      ips[1] = value
      ipKeys[1] = key
    } else if (value > ips[2]) {
      ips[2] = value
      ipKeys[2] = key
    }
  })

  console.log('\nTop 3 Ip Address with highest upbytes')
  printArray(ipKeys)

  const highestTotalBytes = Math.max(...epocMap.values())
  console.log('\nEPOC with highest bytes')
  printArray(getKeys(epocMap, highestTotalBytes))
}

compute()

/* Output
    1) Total upbytes per IpAddress
    2) Top 3 Ip Address with highest upbytes
    3) Epoc - Upbytes + downbytes
*/

// Time Complexity - O(n)
