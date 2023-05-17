class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // Your code here
    let loadFactor = this.count / this.capacity;

    while (loadFactor >= 0.7) {
      this.resize();
      loadFactor = this.count / this.capacity;
    }

    const newData = new KeyValuePair(key, value);
    const index = this.hashMod(key);
    const el = this.data[index];

    if ( el ) {
      let curr = el;

      while (curr) {

        if (curr.key === key) {
          curr.value = value;
          curr = null;
        } else {

          if (!curr.next) {
            this.data[index] = newData
            this.data[index].next = el;
            this.count++;
          }
          curr = curr.next;
        }
      }

    } else {
      this.data[index] = newData;
      this.count++;
    }

  }


  read(key) {
    // Your code here
    const index = this.hashMod(key);
    let curr = this.data[index];

    while (curr) {

      if (curr.key === key) {
        return curr.value;
      } else {
        curr = curr.next;
      }
    }
  }


  resize() {
    // Your code here
    this.capacity = this.capacity * 2;
    const prevData = this.data.map(el => el);

    this.data = new Array(this.capacity);
    this.data.fill(null, 0);
    this.count = 0;

    for(let i = 0; i < prevData.length; i++) {
      let newData = prevData[i];

      if (newData) {
        this.insert(newData.key, newData.value);

        let curr = newData

        while (curr.next) {
          const newNext = curr.next.next;

          this.insert(curr.next.key, curr.next.value);
          curr.next.next = null;
          curr.next = newNext;
        }

      }

    }
  }

  delete(key) {
    // Your code here
    const index = this.hashMod(key);

    let curr = this.data[index];

    if (!this.read(key)) {
      return 'Key not found';
    }

    while (curr.key !== key && curr.next.key !== key) {
      curr = curr.next;
    }

    if (curr.key === key) {
      // If head element is to be deleted
      const newHead = curr.next;
      curr.next = null;
      this.data[index] = newHead;
      this.count--;
    } else {
      const newNext = curr.next.next;
      curr.next.next = null;
      curr.next = newNext;
      this.count--;
    }
  }
}


module.exports = HashTable;
