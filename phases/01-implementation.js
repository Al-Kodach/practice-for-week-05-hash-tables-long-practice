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

    // we increase size of array when time factor exceed 700ms;
    while (loadFactor >= 0.7) {
      this.resize();
      loadFactor = this.count / this.capacity;
    }

    const newNode = new KeyValuePair(key, value),
      idx = this.hashMod(key);

      // check if current index is not occopied.
      if (!this.data[idx]) {
        this.data[idx] = newNode;
        this.count++;
        return;
      }
      
      // if occupied.
      let oldNode = this.data[idx];
      
      // we update value if same key is found;
      while (oldNode) {
        if (oldNode.key === key) {
          oldNode.value = value;
          return;
        }
        // we also check for linked nodes;
        oldNode = oldNode.next;
      }

      // if key is not found
      // we handle collision
      newNode.next = this.data[idx];
      this.data[idx] = newNode;
      this.count++;
  }


  read(key) {
    // Your code here
    if (this.count === 0) return 'not found';

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
    if (this.count === 0) return 'Key not found';
    if ( !(this.read(key)) ) return 'Key not found';

    // not will run below this comment if no data is found 
    // with the help of the this.read(key) method.

    const idx = this.hashMod(key);
    
    // if node to be deleted is the head
    // we replace head with linked node.
    // if node to be deleted is found at the middle
    // we link the prev and next node.
    // this will automatically be remove from the data.
    
    let cur = this.data[idx], 
      prev = null;
    
    while (cur) {

      // if cur node has same key
      // we dislink current from next and previous nodes.
      if (cur.key === key) {
        // check if any previous record,
        // change previous next node to cur next node.
        if (prev) {
          prev.next = cur.next;
        } 
        // when the head is the node to be remove
        else {
          this.data[idx] = cur.next;
        }

        // decrement couter and break the loop.
        this.count--;
        return;
      }

      // if node not found, set current to be previous
      if (cur.next) {
        prev = cur;
      }

      // we continue with our loop.
      cur = cur.next;
    }
    
  }
}


module.exports = HashTable;
