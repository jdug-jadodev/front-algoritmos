/**
 * generate-code-examples.cjs
 *
 * Genera `codeExamples: { js, java, python }` para los 110 algoritmos en
 * `src/data/algorithms.json`. Idempotente: si el campo ya existe, lo
 * sobreescribe. Las implementaciones son canónicas, cortas y pedagógicas.
 *
 * Uso:  node scripts/generate-code-examples.cjs
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const JSON_PATH = path.join(ROOT, 'src', 'data', 'algorithms.json');

// ============================================================================
// Implementaciones: nivel 0-1 (búsqueda, ordenamiento, estructuras básicas)
// ============================================================================

const CODE = {

  // ---------- NIVEL 1 — básico ----------
  'linear-search': {
    js: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
    java: `static int linearSearch(int[] arr, int target) {
  for (int i = 0; i < arr.length; i++) {
    if (arr[i] == target) return i;
  }
  return -1;
}`,
    python: `def linear_search(arr, target):
    for i, v in enumerate(arr):
        if v == target:
            return i
    return -1`,
  },

  'binary-search': {
    js: `function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
    java: `static int binarySearch(int[] arr, int target) {
  int lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    int mid = (lo + hi) >>> 1;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
    python: `def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
  },

  'bubble-sort': {
    js: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    java: `static void bubbleSort(int[] a) {
  for (int i = 0; i < a.length; i++) {
    for (int j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
      }
    }
  }
}`,
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
  },

  'selection-sort': {
    js: `function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    if (min !== i) [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
}`,
    java: `static void selectionSort(int[] a) {
  for (int i = 0; i < a.length; i++) {
    int min = i;
    for (int j = i + 1; j < a.length; j++)
      if (a[j] < a[min]) min = j;
    int t = a[i]; a[i] = a[min]; a[min] = t;
  }
}`,
    python: `def selection_sort(arr):
    for i in range(len(arr)):
        min_i = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_i]:
                min_i = j
        arr[i], arr[min_i] = arr[min_i], arr[i]
    return arr`,
  },

  'insertion-sort': {
    js: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    java: `static void insertionSort(int[] a) {
  for (int i = 1; i < a.length; i++) {
    int key = a[i], j = i - 1;
    while (j >= 0 && a[j] > key) { a[j + 1] = a[j]; j--; }
    a[j + 1] = key;
  }
}`,
    python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
  },

  'merge-sort': {
    js: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = arr.length >> 1;
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
function merge(a, b) {
  const out = []; let i = 0, j = 0;
  while (i < a.length && j < b.length)
    out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  return out.concat(a.slice(i)).concat(b.slice(j));
}`,
    java: `static void mergeSort(int[] a, int l, int r) {
  if (l >= r) return;
  int m = (l + r) >>> 1;
  mergeSort(a, l, m); mergeSort(a, m + 1, r);
  int[] tmp = Arrays.copyOfRange(a, l, r + 1);
  int i = 0, j = m - l + 1, k = l;
  while (i < m - l + 1 && j < tmp.length) a[k++] = tmp[i] <= tmp[j] ? tmp[i++] : tmp[j++];
  while (i < m - l + 1) a[k++] = tmp[i++];
}`,
    python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    return merge(merge_sort(arr[:mid]), merge_sort(arr[mid:]))

def merge(a, b):
    out, i, j = [], 0, 0
    while i < len(a) and j < len(b):
        out.append(a[i] if a[i] <= b[j] else b[j])
        i, j = (i + 1, j) if a[i] <= b[j] else (i, j + 1)
    return out + a[i:] + b[j:]`,
  },

  'quicksort': {
    js: `function quickSort(a, lo = 0, hi = a.length - 1) {
  if (lo < hi) {
    const p = partition(a, lo, hi);
    quickSort(a, lo, p - 1);
    quickSort(a, p + 1, hi);
  }
}
function partition(a, lo, hi) {
  const pivot = a[hi]; let i = lo;
  for (let j = lo; j < hi; j++)
    if (a[j] <= pivot) { [a[i], a[j]] = [a[j], a[i]]; i++; }
  [a[i], a[hi]] = [a[hi], a[i]];
  return i;
}`,
    java: `static void quickSort(int[] a, int lo, int hi) {
  if (lo < hi) {
    int p = partition(a, lo, hi);
    quickSort(a, lo, p - 1); quickSort(a, p + 1, hi);
  }
}
static int partition(int[] a, int lo, int hi) {
  int pivot = a[hi], i = lo;
  for (int j = lo; j < hi; j++)
    if (a[j] <= pivot) { int t = a[i]; a[i++] = a[j]; a[j] = t; }
  int t = a[i]; a[i] = a[hi]; a[hi] = t;
  return i;
}`,
    python: `def quick_sort(a, lo=0, hi=None):
    if hi is None: hi = len(a) - 1
    if lo < hi:
        p = partition(a, lo, hi)
        quick_sort(a, lo, p - 1)
        quick_sort(a, p + 1, hi)

def partition(a, lo, hi):
    pivot, i = a[hi], lo
    for j in range(lo, hi):
        if a[j] <= pivot:
            a[i], a[j] = a[j], a[i]; i += 1
    a[i], a[hi] = a[hi], a[i]
    return i`,
  },

  'heapsort': {
    js: `function heapSort(a) {
  const n = a.length;
  for (let i = (n >> 1) - 1; i >= 0; i--) siftDown(a, i, n);
  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    siftDown(a, 0, i);
  }
}
function siftDown(a, i, n) {
  while (true) {
    let l = 2 * i + 1, r = 2 * i + 2, m = i;
    if (l < n && a[l] > a[m]) m = l;
    if (r < n && a[r] > a[m]) m = r;
    if (m === i) break;
    [a[i], a[m]] = [a[m], a[i]]; i = m;
  }
}`,
    java: `static void heapSort(int[] a) {
  int n = a.length;
  for (int i = n/2 - 1; i >= 0; i--) sift(a, i, n);
  for (int i = n - 1; i > 0; i--) {
    int t = a[0]; a[0] = a[i]; a[i] = t;
    sift(a, 0, i);
  }
}
static void sift(int[] a, int i, int n) {
  while (true) {
    int l = 2*i+1, r = 2*i+2, m = i;
    if (l < n && a[l] > a[m]) m = l;
    if (r < n && a[r] > a[m]) m = r;
    if (m == i) break;
    int t = a[i]; a[i] = a[m]; a[m] = t;
    i = m;
  }
}`,
    python: `def heapsort(a):
    n = len(a)
    for i in range(n // 2 - 1, -1, -1):
        _sift(a, i, n)
    for i in range(n - 1, 0, -1):
        a[0], a[i] = a[i], a[0]
        _sift(a, 0, i)

def _sift(a, i, n):
    while True:
        l, r, m = 2*i + 1, 2*i + 2, i
        if l < n and a[l] > a[m]: m = l
        if r < n and a[r] > a[m]: m = r
        if m == i: break
        a[i], a[m] = a[m], a[i]; i = m`,
  },

  'counting-sort': {
    js: `function countingSort(a) {
  const max = Math.max(...a);
  const c = new Array(max + 1).fill(0);
  for (const x of a) c[x]++;
  const out = [];
  for (let i = 0; i <= max; i++) while (c[i]--) out.push(i);
  return out;
}`,
    java: `static int[] countingSort(int[] a) {
  int max = Arrays.stream(a).max().getAsInt();
  int[] c = new int[max + 1];
  for (int x : a) c[x]++;
  int k = 0;
  for (int i = 0; i <= max; i++)
    while (c[i]-- > 0) a[k++] = i;
  return a;
}`,
    python: `def counting_sort(a):
    m = max(a)
    c = [0] * (m + 1)
    for x in a: c[x] += 1
    out = []
    for i, v in enumerate(c):
        out.extend([i] * v)
    return out`,
  },

  'radix-sort': {
    js: `function radixSort(a) {
  const max = Math.max(...a);
  let exp = 1;
  while (Math.floor(max / exp) > 0) {
    a = countingByDigit(a, exp);
    exp *= 10;
  }
  return a;
}
function countingByDigit(a, exp) {
  const out = new Array(a.length).fill(0);
  const c = new Array(10).fill(0);
  for (const x of a) c[Math.floor(x / exp) % 10]++;
  for (let i = 1; i < 10; i++) c[i] += c[i - 1];
  for (let i = a.length - 1; i >= 0; i--)
    out[--c[Math.floor(a[i] / exp) % 10]] = a[i];
  return out;
}`,
    java: `static int[] radixSort(int[] a) {
  int max = Arrays.stream(a).max().getAsInt();
  for (int exp = 1; max / exp > 0; exp *= 10) {
    int[] out = new int[a.length];
    int[] c = new int[10];
    for (int x : a) c[(x / exp) % 10]++;
    for (int i = 1; i < 10; i++) c[i] += c[i - 1];
    for (int i = a.length - 1; i >= 0; i--)
      out[--c[(a[i] / exp) % 10]] = a[i];
    a = out;
  }
  return a;
}`,
    python: `def radix_sort(a):
    m = max(a); exp = 1
    while m // exp > 0:
        a = _by_digit(a, exp); exp *= 10
    return a

def _by_digit(a, exp):
    c = [0] * 10
    for x in a: c[(x // exp) % 10] += 1
    for i in range(1, 10): c[i] += c[i - 1]
    out = [0] * len(a)
    for i in range(len(a) - 1, -1, -1):
        d = (a[i] // exp) % 10
        out[c[d] - 1] = a[i]; c[d] -= 1
    return out`,
  },

  'arrays': {
    js: `// Crear, acceder, modificar, recorrer
const arr = [10, 20, 30, 40];
console.log(arr[0]);          // 10
arr.push(50);                // agrega al final
arr[1] = 99;                  // modifica
for (const x of arr) console.log(x);`,
    java: `int[] arr = {10, 20, 30, 40};
System.out.println(arr[0]);     // 10
arr[1] = 99;
for (int x : arr) System.out.println(x);`,
    python: `arr = [10, 20, 30, 40]
print(arr[0])         # 10
arr[1] = 99
for x in arr:
    print(x)`,
  },

  'linked-list': {
    js: `class Node { constructor(v, n = null) { this.v = v; this.n = n; } }
class LinkedList {
  constructor() { this.head = null; }
  prepend(v) { this.head = new Node(v, this.head); }
  toArray() {
    const out = []; let cur = this.head;
    while (cur) { out.push(cur.v); cur = cur.n; }
    return out;
  }
}`,
    java: `static class Node { int v; Node n; Node(int v, Node n){ this.v = v; this.n = n; } }
static Node prepend(Node head, int v) { return new Node(v, head); }`,
    python: `class Node:
    def __init__(self, v, n=None):
        self.v, self.n = v, n

def prepend(head, v):
    return Node(v, head)`,
  },

  'stack': {
    js: `class Stack {
  constructor() { this.a = []; }
  push(x) { this.a.push(x); }
  pop() { return this.a.pop(); }
  peek() { return this.a[this.a.length - 1]; }
}`,
    java: `Deque<Integer> s = new ArrayDeque<>();
s.push(1); s.push(2);
int top = s.pop();   // 2`,
    python: `s = []
s.append(1); s.append(2)   # push
top = s.pop()              # pop`,
  },

  'queue': {
    js: `class Queue {
  constructor() { this.a = []; }
  enqueue(x) { this.a.push(x); }
  dequeue() { return this.a.shift(); }
}`,
    java: `Queue<Integer> q = new ArrayDeque<>();
q.offer(1); q.offer(2);
int head = q.poll();   // 1`,
    python: `from collections import deque
q = deque()
q.append(1); q.append(2)   # enqueue
head = q.popleft()         # dequeue`,
  },

  'deque': {
    js: `class Deque {
  constructor() { this.a = []; }
  pushFront(x) { this.a.unshift(x); }
  pushBack(x) { this.a.push(x); }
  popFront() { return this.a.shift(); }
  popBack() { return this.a.pop(); }
}`,
    java: `Deque<Integer> d = new ArrayDeque<>();
d.offerFirst(1); d.offerLast(2);
d.pollFirst(); d.pollLast();`,
    python: `from collections import deque
d = deque()
d.appendleft(1); d.append(2)
d.popleft(); d.pop()`,
  },

  'hash-table': {
    js: `const map = new Map();
map.set('a', 1);
map.set('b', 2);
if (map.has('a')) console.log(map.get('a'));
map.delete('a');`,
    java: `Map<String, Integer> m = new HashMap<>();
m.put("a", 1); m.put("b", 2);
if (m.containsKey("a")) System.out.println(m.get("a"));
m.remove("a");`,
    python: `m = {}
m["a"] = 1; m["b"] = 2
if "a" in m: print(m["a"])
del m["a"]`,
  },

  'recursion-basic': {
    js: `function factorial(n) {
  if (n <= 1) return 1;       // caso base
  return n * factorial(n - 1); // paso recursivo
}
console.log(factorial(5)); // 120`,
    java: `static long factorial(int n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
    python: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)`,
  },

  'permutations': {
    js: `function permute(a) {
  if (a.length <= 1) return [a];
  const out = [];
  for (let i = 0; i < a.length; i++) {
    const rest = a.slice(0, i).concat(a.slice(i + 1));
    for (const p of permute(rest)) out.push([a[i], ...p]);
  }
  return out;
}
permute([1, 2, 3]);`,
    java: `static void permute(int[] a, int l, List<int[]> out) {
  if (l == a.length - 1) { out.add(a.clone()); return; }
  for (int i = l; i < a.length; i++) {
    int t = a[l]; a[l] = a[i]; a[i] = t;
    permute(a, l + 1, out);
    t = a[l]; a[l] = a[i]; a[i] = t;
  }
}`,
    python: `def permute(a):
    if len(a) <= 1:
        yield a
    for i in range(len(a)):
        rest = a[:i] + a[i+1:]
        for p in permute(rest):
            yield (a[i],) + p`,
  },

  'n-queens': {
    js: `function solveNQueens(n) {
  const res = [];
  const cols = new Set(), d1 = new Set(), d2 = new Set();
  function bt(row, board) {
    if (row === n) { res.push([...board]); return; }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || d1.has(row - c) || d2.has(row + c)) continue;
      cols.add(c); d1.add(row - c); d2.add(row + c);
      board.push(c);
      bt(row + 1, board);
      board.pop();
      cols.delete(c); d1.delete(row - c); d2.delete(row + c);
    }
  }
  bt(0, []);
  return res;
}`,
    java: `static void solve(int n, int row, int[] cols,
    Set<Integer> d1, Set<Integer> d2, List<int[]> out) {
  if (row == n) { out.add(cols.clone()); return; }
  for (int c = 0; c < n; c++) {
    if (d1.contains(row - c) || d2.contains(row + c)) continue;
    cols[row] = c;
    d1.add(row - c); d2.add(row + c);
    solve(n, row + 1, cols, d1, d2, out);
    d1.remove(row - c); d2.remove(row + c);
  }
}`,
    python: `def n_queens(n):
    res, cols, d1, d2 = [], set(), set(), set()
    def bt(row, board):
        if row == n:
            res.append(board); return
        for c in range(n):
            if c in cols or row - c in d1 or row + c in d2: continue
            cols.add(c); d1.add(row - c); d2.add(row + c)
            bt(row + 1, board + [c])
            cols.remove(c); d1.remove(row - c); d2.remove(row + c)
    bt(0, [])
    return res`,
  },

  // ---------- NIVEL 2 — intermedio ----------
  'bst': {
    js: `class Node { constructor(v) { this.v = v; this.l = this.r = null; } }
function search(root, t) {
  while (root) {
    if (t === root.v) return root;
    root = t < root.v ? root.l : root.r;
  }
  return null;
}`,
    java: `static Node search(Node root, int t) {
  while (root != null) {
    if (t == root.v) return root;
    root = t < root.v ? root.l : root.r;
  }
  return null;
}`,
    python: `def bst_search(root, t):
    while root is not None:
        if t == root.v: return root
        root = root.l if t < root.v else root.r
    return None`,
  },

  'avl-tree': {
    js: `function rotateRight(y) {
  const x = y.l; y.l = x.r; x.r = y;
  y.h = 1 + Math.max(h(y.l), h(y.r));
  x.h = 1 + Math.max(h(x.l), h(x.r));
  return x;
}`,
    java: `static Node rotateRight(Node y) {
  Node x = y.l; y.l = x.r; x.r = y;
  y.h = 1 + Math.max(h(y.l), h(y.r));
  x.h = 1 + Math.max(h(x.l), h(x.r));
  return x;
}`,
    python: `def rotate_right(y):
    x = y.l
    y.l, x.r = x.r, y
    y.h = 1 + max(_h(y.l), _h(y.r))
    x.h = 1 + max(_h(x.l), _h(x.r))
    return x`,
  },

  'red-black-tree': {
    js: `// Idea: BST con invariantes de color.
// Inserción se hace como BST + fix-up con rotaciones y recoloreos.
// Implementación completa ~150 líneas. Ver CLRS Cap. 13.`,
    java: `// BST con invariantes de color (rojo/negro).
// Inserción como BST + fix-up con rotaciones y recoloreos.
// Ver java.util.TreeMap (Red-Black tree) para referencia.`,
    python: `# Red-Black tree: BST con invariantes de color.
# Inserción como BST + fix-up (rotaciones y recoloreos).
# Ver 'bintrees' o 'sortedcontainers' como referencia.`,
  },

  'heap': {
    js: `class MinHeap {
  constructor() { this.a = []; }
  push(x) {
    this.a.push(x);
    for (let i = this.a.length - 1; i > 0;) {
      const p = (i - 1) >> 1;
      if (this.a[p] <= this.a[i]) break;
      [this.a[p], this.a[i]] = [this.a[i], this.a[p]]; i = p;
    }
  }
  pop() {
    const top = this.a[0];
    const last = this.a.pop();
    if (this.a.length) {
      this.a[0] = last;
      for (let i = 0;;) {
        const l = 2 * i + 1, r = 2 * i + 2; let m = i;
        if (l < this.a.length && this.a[l] < this.a[m]) m = l;
        if (r < this.a.length && this.a[r] < this.a[m]) m = r;
        if (m === i) break;
        [this.a[i], this.a[m]] = [this.a[m], this.a[i]]; i = m;
      }
    }
    return top;
  }
}`,
    java: `PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(3); pq.offer(1); pq.offer(2);
while (!pq.isEmpty()) System.out.println(pq.poll());`,
    python: `import heapq
pq = []
heapq.heappush(pq, 3)
heapq.heappush(pq, 1)
heapq.heappush(pq, 2)
while pq:
    print(heapq.heappop(pq))`,
  },

  'trie': {
    js: `class Trie {
  constructor() { this.root = {}; }
  insert(word) {
    let n = this.root;
    for (const c of word) (n[c] = n[c] || {}), (n = n[c]);
    n.$ = true;
  }
  has(word) {
    let n = this.root;
    for (const c of word) { if (!n[c]) return false; n = n[c]; }
    return !!n.$;
  }
}`,
    java: `static class Node { Map<Character, Node> ch = new HashMap<>(); boolean end; }
void insert(Node root, String w) {
  for (char c : w.toCharArray()) {
    root.ch.putIfAbsent(c, new Node()); root = root.ch.get(c);
  }
  root.end = true;
}`,
    python: `class Trie:
    def __init__(self):
        self.root = {}
    def insert(self, w):
        n = self.root
        for c in w:
            n = n.setdefault(c, {})
        n['$'] = True
    def has(self, w):
        n = self.root
        for c in w:
            if c not in n: return False
            n = n[c]
        return n.get('$', False)`,
  },

  'kmp': {
    js: `function kmp(text, pat) {
  const lps = computeLPS(pat);
  let i = 0, j = 0, out = [];
  while (i < text.length) {
    if (text[i] === pat[j]) { i++; j++; }
    if (j === pat.length) { out.push(i - j); j = lps[j - 1]; }
    else if (i < text.length && text[i] !== pat[j])
      j ? j = lps[j - 1] : i++;
  }
  return out;
}`,
    java: `static int[] kmp(String t, String p) {
  int[] lps = lps(p);
  int i = 0, j = 0; List<Integer> out = new ArrayList<>();
  while (i < t.length()) {
    if (t.charAt(i) == p.charAt(j)) { i++; j++; }
    if (j == p.length()) { out.add(i - j); j = lps[j - 1]; }
    else if (i < t.length() && t.charAt(i) != p.charAt(j))
      if (j != 0) j = lps[j - 1]; else i++;
  }
  return out.stream().mapToInt(Integer::intValue).toArray();
}`,
    python: `def kmp(t, p):
    lps = _lps(p); i = j = 0; out = []
    while i < len(t):
        if t[i] == p[j]: i += 1; j += 1
        if j == len(p): out.append(i - j); j = lps[j - 1]
        elif i < len(t) and t[i] != p[j]:
            j = lps[j - 1] if j else i + 1 - 1  # no-op
            if j == 0: i += 1
    return out`,
  },

  'z-algorithm': {
    js: `function zArray(s) {
  const n = s.length, z = new Array(n).fill(0);
  let l = 0, r = 0;
  for (let i = 1; i < n; i++) {
    if (i <= r) z[i] = Math.min(r - i + 1, z[i - l]);
    while (i + z[i] < n && s[z[i]] === s[i + z[i]]) z[i]++;
    if (i + z[i] - 1 > r) { l = i; r = i + z[i] - 1; }
  }
  return z;
}`,
    java: `static int[] zArray(String s) {
  int n = s.length(); int[] z = new int[n];
  int l = 0, r = 0;
  for (int i = 1; i < n; i++) {
    if (i <= r) z[i] = Math.min(r - i + 1, z[i - l]);
    while (i + z[i] < n && s.charAt(z[i]) == s.charAt(i + z[i])) z[i]++;
    if (i + z[i] - 1 > r) { l = i; r = i + z[i] - 1; }
  }
  return z;
}`,
    python: `def z_array(s):
    n = len(s); z = [0] * n; l = r = 0
    for i in range(1, n):
        if i <= r: z[i] = min(r - i + 1, z[i - l])
        while i + z[i] < n and s[z[i]] == s[i + z[i]]: z[i] += 1
        if i + z[i] - 1 > r: l, r = i, i + z[i] - 1
    return z`,
  },

  'rabin-karp': {
    js: `function rabinKarp(text, pat) {
  const d = 256, q = 101;
  const n = text.length, m = pat.length;
  let h = 1, p = 0, t = 0, out = [];
  for (let i = 0; i < m - 1; i++) h = (h * d) % q;
  for (let i = 0; i < m; i++) { p = (d * p + pat.charCodeAt(i)) % q; t = (d * t + text.charCodeAt(i)) % q; }
  for (let i = 0; i <= n - m; i++) {
    if (p === t && text.slice(i, i + m) === pat) out.push(i);
    if (i < n - m) t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
    if (t < 0) t += q;
  }
  return out;
}`,
    java: `static List<Integer> rabinKarp(String t, String p) {
  int d = 256, q = 101, n = t.length(), m = p.length();
  long h = 1, ph = 0, th = 0; List<Integer> out = new ArrayList<>();
  for (int i = 0; i < m - 1; i++) h = (h * d) % q;
  for (int i = 0; i < m; i++) { ph = (d * ph + p.charAt(i)) % q; th = (d * th + t.charAt(i)) % q; }
  for (int i = 0; i <= n - m; i++) {
    if (ph == th && t.substring(i, i + m).equals(p)) out.add(i);
    if (i < n - m) th = (d * (th - t.charAt(i) * h) + t.charAt(i + m)) % q;
    if (th < 0) th += q;
  }
  return out;
}`,
    python: `def rabin_karp(t, p):
    d, q, n, m = 256, 101, len(t), len(p); h = pow(d, m - 1, q)
    ph = sum(d**(m-1-i) * ord(p[i]) for i in range(m)) % q
    th = sum(d**(m-1-i) * ord(t[i]) for i in range(m)) % q
    out = []
    for i in range(n - m + 1):
        if ph == th and t[i:i+m] == p: out.append(i)
        if i < n - m:
            th = (d * (th - ord(t[i]) * h) + ord(t[i + m])) % q
    return out`,
  },

  'aho-corasick': {
    js: `// Aho-Corasick: trie + failure links (BFS) + output links.
// Construcción: O(sum |pat|). Búsqueda: O(|text| + matches).
// Ver implementación completa en AhoCorasick.js (~80 líneas).`,
    java: `// Trie + failure links (BFS) + output links.
// Build: O(sum |pat|). Search: O(|text| + matches).
// Ver AhoCorasick.java (~100 líneas).`,
    python: `# Trie + failure links (BFS) + output links.
# Build: O(sum len(pat)). Search: O(len(text) + matches).
# Ver AhoCorasick.py (~80 líneas).`,
  },

  'suffix-array': {
    js: `// Algoritmo de Doubling (Kar-Mäkinen-Sanders):
// ordena por prefijo de longitud 2^k, en log n pasos. O(n log n).
// Construye suffix array en O(n log^2 n) o O(n log n) con truco.`,
    java: `// Suffix Array por doubling: O(n log n) o DC3: O(n).
// Ver SuffixArray.java (Doubling) o lib 'dc3' para lineal.`,
    python: `# Suffix Array por doubling: O(n log n).
# DC3 (Kärkkäinen-Sanders) da O(n).
# Ver 'pysais' (SA-IS linear-time).`,
  },

  'suffix-automaton': {
    js: `// Estructura: DAG de estados (longest substring + suffix link).
// Construcción online en O(n) por carácter.
// Aplicaciones: substring distinto count, longest common substring, etc.`,
    java: `// DAG de estados (longest + suffix link). Construcción online O(n).
// Usos: contar substrings distintos, LCS multi-string, etc.`,
    python: `# DAG de estados (longest + suffix link). Online O(n).
# Usos: contar substrings distintos, LCS entre múltiples strings.`,
  },

  'bfs': {
    js: `function bfs(graph, start) {
  const visited = new Set([start]);
  const q = [start], order = [];
  while (q.length) {
    const u = q.shift();
    order.push(u);
    for (const v of graph[u] || [])
      if (!visited.has(v)) { visited.add(v); q.push(v); }
  }
  return order;
}`,
    java: `static List<Integer> bfs(Map<Integer, List<Integer>> g, int s) {
  Set<Integer> vis = new HashSet<>(); Queue<Integer> q = new ArrayDeque<>();
  List<Integer> order = new ArrayList<>();
  vis.add(s); q.add(s);
  while (!q.isEmpty()) {
    int u = q.poll(); order.add(u);
    for (int v : g.getOrDefault(u, List.of()))
      if (vis.add(v)) q.add(v);
  }
  return order;
}`,
    python: `from collections import deque
def bfs(g, s):
    vis, q, order = {s}, deque([s]), []
    while q:
        u = q.popleft(); order.append(u)
        for v in g.get(u, []):
            if v not in vis:
                vis.add(v); q.append(v)
    return order`,
  },

  'dfs': {
    js: `function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  const order = [start];
  for (const v of graph[start] || [])
    if (!visited.has(v)) order.push(...dfs(graph, v, visited));
  return order;
}`,
    java: `static void dfs(Map<Integer, List<Integer>> g, int u,
    Set<Integer> vis, List<Integer> order) {
  vis.add(u); order.add(u);
  for (int v : g.getOrDefault(u, List.of()))
    if (vis.add(v)) dfs(g, v, vis, order);
}`,
    python: `def dfs(g, u, vis=None, order=None):
    if vis is None: vis, order = set(), []
    vis.add(u); order.append(u)
    for v in g.get(u, []):
        if v not in vis: dfs(g, v, vis, order)
    return order`,
  },

  'topological-sort': {
    js: `function topoSort(n, edges) {
  const indeg = new Array(n).fill(0);
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) { adj[u].push(v); indeg[v]++; }
  const q = [];
  for (let i = 0; i < n; i++) if (indeg[i] === 0) q.push(i);
  const out = [];
  while (q.length) {
    const u = q.shift(); out.push(u);
    for (const v of adj[u]) if (--indeg[v] === 0) q.push(v);
  }
  return out;
}`,
    java: `static int[] topoSort(int n, int[][] edges) {
  int[] indeg = new int[n]; List<List<Integer>> adj = new ArrayList<>();
  for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
  for (int[] e : edges) { adj.get(e[0]).add(e[1]); indeg[e[1]]++; }
  Queue<Integer> q = new ArrayDeque<>(); int[] out = new int[n];
  for (int i = 0; i < n; i++) if (indeg[i] == 0) q.add(i);
  int k = 0;
  while (!q.isEmpty()) {
    int u = q.poll(); out[k++] = u;
    for (int v : adj.get(u)) if (--indeg[v] == 0) q.add(v);
  }
  return out;
}`,
    python: `def topo_sort(n, edges):
    indeg = [0] * n
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v); indeg[v] += 1
    from collections import deque
    q = deque([i for i in range(n) if indeg[i] == 0])
    out = []
    while q:
        u = q.popleft(); out.append(u)
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0: q.append(v)
    return out`,
  },

  'cycle-detection': {
    js: `// Dirigidos: DFS con estados 0=no,1=en pila,2=hecho → back-edge = ciclo.
// No dirigidos: Union-Find o DFS con parent.
function hasCycleUndirected(n, edges) {
  const p = Array.from({ length: n }, (_, i) => i);
  const f = x => p[x] === x ? x : (p[x] = f(p[x]));
  for (const [u, v] of edges) {
    const pu = f(u), pv = f(v);
    if (pu === pv) return true;
    p[pu] = pv;
  }
  return false;
}`,
    java: `static boolean hasCycleUndirected(int n, int[][] edges) {
  int[] p = new int[n]; for (int i = 0; i < n; i++) p[i] = i;
  for (int[] e : edges) {
    if (find(p, e[0]) == find(p, e[1])) return true;
    union(p, e[0], e[1]);
  }
  return false;
}`,
    python: `def has_cycle(n, edges):
    p = list(range(n))
    def f(x):
        while p[x] != x: p[x] = p[p[x]]; x = p[x]
        return x
    for u, v in edges:
        if f(u) == f(v): return True
        p[f(u)] = f(v)
    return False`,
  },

  'dijkstra': {
    js: `function dijkstra(graph, src) {
  const dist = Object.fromEntries(Object.keys(graph).map(k => [k, Infinity]));
  dist[src] = 0;
  const pq = [[0, src]];
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift();
    if (d > dist[u]) continue;
    for (const [v, w] of graph[u] || [])
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        pq.push([dist[v], v]);
      }
  }
  return dist;
}`,
    java: `static Map<String, Integer> dijkstra(Map<String, List<int[]>> g, String src) {
  Map<String, Integer> dist = new HashMap<>();
  for (String k : g.keySet()) dist.put(k, Integer.MAX_VALUE);
  dist.put(src, 0);
  PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
  pq.offer(new int[]{0, g.get(src).get(0)[1]});
  while (!pq.isEmpty()) {
    int[] e = pq.poll();
    for (int[] ed : g.get("n" + e[1])) {
      int nd = e[0] + ed[0];
      String v = "n" + ed[1];
      if (nd < dist.getOrDefault(v, Integer.MAX_VALUE)) { dist.put(v, nd); pq.offer(new int[]{nd, ed[1]}); }
    }
  }
  return dist;
}`,
    python: `import heapq
def dijkstra(g, src):
    dist = {k: float('inf') for k in g}; dist[src] = 0
    pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v, w in g[u]:
            nd = d + w
            if nd < dist[v]:
                dist[v] = nd; heapq.heappush(pq, (nd, v))
    return dist`,
  },

  'bellman-ford': {
    js: `function bellmanFord(n, edges, src) {
  const d = new Array(n).fill(Infinity);
  d[src] = 0;
  for (let i = 0; i < n - 1; i++)
    for (const [u, v, w] of edges)
      if (d[u] + w < d[v]) d[v] = d[u] + w;
  for (const [u, v, w] of edges)
    if (d[u] + w < d[v]) throw new Error('ciclo negativo');
  return d;
}`,
    java: `static long[] bellmanFord(int n, int[][] edges, int src) {
  long[] d = new long[n]; Arrays.fill(d, Long.MAX_VALUE / 4);
  d[src] = 0;
  for (int i = 0; i < n - 1; i++)
    for (int[] e : edges)
      if (d[e[0]] + e[2] < d[e[1]]) d[e[1]] = d[e[0]] + e[2];
  return d;
}`,
    python: `def bellman_ford(n, edges, src):
    INF = float('inf')
    d = [INF] * n; d[src] = 0
    for _ in range(n - 1):
        for u, v, w in edges:
            if d[u] + w < d[v]: d[v] = d[u] + w
    return d`,
  },

  'floyd-warshall': {
    js: `function floyd(d) {
  const n = d.length;
  for (let k = 0; k < n; k++)
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (d[i][k] + d[k][j] < d[i][j]) d[i][j] = d[i][k] + d[k][j];
  return d;
}`,
    java: `static int[][] floyd(int[][] d) {
  int n = d.length;
  for (int k = 0; k < n; k++)
    for (int i = 0; i < n; i++)
      for (int j = 0; j < n; j++)
        if (d[i][k] + d[k][j] < d[i][j]) d[i][j] = d[i][k] + d[k][j];
  return d;
}`,
    python: `def floyd(d):
    n = len(d)
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if d[i][k] + d[k][j] < d[i][j]: d[i][j] = d[i][k] + d[k][j]
    return d`,
  },

  'prim': {
    js: `function prim(graph, start) {
  const inMST = new Set(), edges = [];
  inMST.add(start);
  const pq = (graph[start] || []).map(([v, w]) => [w, start, v]);
  pq.sort((a, b) => a[0] - b[0]);
  while (pq.length) {
    const [w, u, v] = pq.shift();
    if (inMST.has(v)) continue;
    inMST.add(v); edges.push([u, v, w]);
    for (const [nx, nw] of graph[v] || [])
      if (!inMST.has(nx)) pq.push([nw, v, nx]);
    pq.sort((a, b) => a[0] - b[0]);
  }
  return edges;
}`,
    java: `static List<int[]> prim(Map<Integer, List<int[]>> g, int s) {
  Set<Integer> in = new HashSet<>(); List<int[]> out = new ArrayList<>();
  PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
  in.add(s);
  for (int[] e : g.get(s)) pq.offer(new int[]{e[1], s, e[0]});
  while (!pq.isEmpty()) {
    int[] e = pq.poll();
    if (!in.add(e[2])) continue;
    out.add(new int[]{e[1], e[2], e[0]});
    for (int[] ne : g.get(e[2])) if (!in.contains(ne[0])) pq.offer(new int[]{ne[1], e[2], ne[0]});
  }
  return out;
}`,
    python: `import heapq
def prim(g, s):
    in_mst = {s}; out, pq = [], []
    for v, w in g[s]: heapq.heappush(pq, (w, s, v))
    while pq:
        w, u, v = heapq.heappop(pq)
        if v in in_mst: continue
        in_mst.add(v); out.append((u, v, w))
        for nx, nw in g[v]:
            if nx not in in_mst: heapq.heappush(pq, (nw, v, nx))
    return out`,
  },

  'kruskal': {
    js: `function kruskal(n, edges) {
  edges.sort((a, b) => a[2] - b[2]);
  const p = Array.from({ length: n }, (_, i) => i);
  const f = x => p[x] === x ? x : (p[x] = f(p[x]));
  const out = [];
  for (const [u, v, w] of edges) {
    if (f(u) === f(v)) continue;
    p[f(u)] = f(v);
    out.push([u, v, w]);
  }
  return out;
}`,
    java: `static int[][] kruskal(int n, int[][] edges) {
  Arrays.sort(edges, (a, b) -> a[2] - b[2]);
  int[] p = new int[n]; for (int i = 0; i < n; i++) p[i] = i;
  List<int[]> out = new ArrayList<>();
  for (int[] e : edges) {
    int pu = find(p, e[0]), pv = find(p, e[1]);
    if (pu != pv) { p[pu] = pv; out.add(e); }
  }
  return out.toArray(new int[0][]);
}`,
    python: `def kruskal(n, edges):
    p = list(range(n))
    def f(x):
        while p[x] != x: p[x] = p[p[x]]; x = p[x]
        return x
    out = []
    for u, v, w in sorted(edges, key=lambda e: e[2]):
        if f(u) != f(v): p[f(u)] = f(v); out.append((u, v, w))
    return out`,
  },

  'union-find': {
    js: `class UF {
  constructor(n) { this.p = Array.from({ length: n }, (_, i) => i); this.r = new Array(n).fill(0); }
  find(x) { return this.p[x] === x ? x : (this.p[x] = this.find(this.p[x])); }
  union(a, b) {
    const ra = this.find(a), rb = this.find(b);
    if (ra === rb) return false;
    if (this.r[ra] < this.r[rb]) [this.p[ra], this.p[rb]] = [this.p[rb], this.p[ra]];
    if (this.r[ra] === this.r[rb]) this.r[ra]++;
    return true;
  }
}`,
    java: `static class UF {
  int[] p; int[] r;
  UF(int n) { p = new int[n]; r = new int[n]; for (int i = 0; i < n; i++) p[i] = i; }
  int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
  boolean union(int a, int b) {
    int ra = find(a), rb = find(b); if (ra == rb) return false;
    if (r[ra] < r[rb]) { int t = ra; ra = rb; rb = t; }
    p[rb] = ra; if (r[ra] == r[rb]) r[ra]++; return true;
  }
}`,
    python: `class UF:
    def __init__(self, n):
        self.p = list(range(n)); self.r = [0] * n
    def find(self, x):
        while self.p[x] != x: self.p[x] = self.p[self.p[x]]; x = self.p[x]
        return x
    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra == rb: return False
        if self.r[ra] < self.r[rb]: ra, rb = rb, ra
        self.p[rb] = ra
        if self.r[ra] == self.r[rb]: self.r[ra] += 1
        return True`,
  },

  'scc': {
    js: `// Kosaraju: 2 DFS sobre el grafo y su reverso.
// Tarjan: 1 DFS con stack + low-link. Más eficiente en práctica.`,
    java: `// Kosaraju: 2 DFS (grafo + reverso).
// Tarjan: 1 DFS con lowlink. Más usado en producción.`,
    python: `# Kosaraju: 2 DFS sobre grafo y su reverso.
# Tarjan: 1 DFS con lowlink. Más eficiente en práctica.`,
  },

  'knapsack': {
    js: `function knapsack(W, w, v) {
  const dp = new Array(W + 1).fill(0);
  for (let i = 0; i < w.length; i++)
    for (let j = W; j >= w[i]; j--)
      dp[j] = Math.max(dp[j], dp[j - w[i]] + v[i]);
  return dp[W];
}`,
    java: `static int knapsack(int W, int[] w, int[] v) {
  int[] dp = new int[W + 1];
  for (int i = 0; i < w.length; i++)
    for (int j = W; j >= w[i]; j--)
      dp[j] = Math.max(dp[j], dp[j - w[i]] + v[i]);
  return dp[W];
}`,
    python: `def knapsack(W, w, v):
    dp = [0] * (W + 1)
    for i in range(len(w)):
        for j in range(W, w[i] - 1, -1):
            dp[j] = max(dp[j], dp[j - w[i]] + v[i])
    return dp[W]`,
  },

  'lis': {
    js: `function lis(a) {
  const tails = [];
  for (const x of a) {
    let lo = 0, hi = tails.length;
    while (lo < hi) { const m = (lo + hi) >> 1; tails[m] < x ? lo = m + 1 : hi = m; }
    tails[lo] = x;
  }
  return tails.length;
}`,
    java: `static int lis(int[] a) {
  List<Integer> tails = new ArrayList<>();
  for (int x : a) {
    int lo = 0, hi = tails.size();
    while (lo < hi) { int m = (lo + hi) >>> 1; if (tails.get(m) < x) lo = m + 1; else hi = m; }
    if (lo == tails.size()) tails.add(x); else tails.set(lo, x);
  }
  return tails.size();
}`,
    python: `import bisect
def lis(a):
    tails = []
    for x in a:
        i = bisect.bisect_left(tails, x)
        if i == len(tails): tails.append(x)
        else: tails[i] = x
    return len(tails)`,
  },

  'lcs': {
    js: `function lcs(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
  return dp[m][n];
}`,
    java: `static int lcs(String a, String b) {
  int m = a.length(), n = b.length();
  int[][] dp = new int[m + 1][n + 1];
  for (int i = 1; i <= m; i++)
    for (int j = 1; j <= n; j++)
      dp[i][j] = a.charAt(i - 1) == b.charAt(j - 1)
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
  return dp[m][n];
}`,
    python: `def lcs(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i-1] == b[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]`,
  },

  'edit-distance': {
    js: `function edit(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0)
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[m][n];
}`,
    java: `static int edit(String a, String b) {
  int m = a.length(), n = b.length();
  int[][] dp = new int[m + 1][n + 1];
  for (int i = 0; i <= m; i++) dp[i][0] = i;
  for (int j = 0; j <= n; j++) dp[0][j] = j;
  for (int i = 1; i <= m; i++)
    for (int j = 1; j <= n; j++)
      dp[i][j] = a.charAt(i - 1) == b.charAt(j - 1)
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[m][n];
}`,
    python: `def edit(a, b):
    m, n = len(a), len(b)
    dp = [[i if j == 0 else (j if i == 0 else 0) for j in range(n + 1)] for i in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i-1] == b[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    return dp[m][n]`,
  },

  'dp-memoization': {
    js: `const memo = new Map();
function fib(n) {
  if (n < 2) return n;
  if (memo.has(n)) return memo.get(n);
  const v = fib(n - 1) + fib(n - 2);
  memo.set(n, v);
  return v;
}`,
    java: `static long[] memo = new long[1000];
static long fib(int n) {
  if (n < 2) return n;
  if (memo[n] != 0) return memo[n];
  return memo[n] = fib(n - 1) + fib(n - 2);
}`,
    python: `from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2: return n
    return fib(n - 1) + fib(n - 2)`,
  },

  'quickselect': {
    js: `function quickSelect(a, k) {
  let lo = 0, hi = a.length - 1;
  while (lo < hi) {
    const p = partition(a, lo, hi);
    if (p === k) return a[p];
    if (p < k) lo = p + 1; else hi = p - 1;
  }
  return a[lo];
}
function partition(a, lo, hi) {
  const pivot = a[hi]; let i = lo;
  for (let j = lo; j < hi; j++)
    if (a[j] <= pivot) { [a[i], a[j]] = [a[j], a[i]]; i++; }
  [a[i], a[hi]] = [a[hi], a[i]];
  return i;
}`,
    java: `static int quickSelect(int[] a, int k, int lo, int hi) {
  while (lo < hi) {
    int p = partition(a, lo, hi);
    if (p == k) return a[p];
    if (p < k) lo = p + 1; else hi = p - 1;
  }
  return a[lo];
}`,
    python: `def quick_select(a, k, lo=0, hi=None):
    if hi is None: hi = len(a) - 1
    while lo < hi:
        p = _partition(a, lo, hi)
        if p == k: return a[p]
        if p < k: lo = p + 1
        else: hi = p - 1
    return a[lo]`,
  },

  'two-pointers': {
    js: `// Ejemplo: dos suma en array ordenado → O(n).
function twoSum(a, t) {
  let lo = 0, hi = a.length - 1;
  while (lo < hi) {
    const s = a[lo] + a[hi];
    if (s === t) return [lo, hi];
    s < t ? lo++ : hi--;
  }
  return null;
}`,
    java: `static int[] twoSum(int[] a, int t) {
  int lo = 0, hi = a.length - 1;
  while (lo < hi) {
    int s = a[lo] + a[hi];
    if (s == t) return new int[]{lo, hi};
    if (s < t) lo++; else hi--;
  }
  return null;
}`,
    python: `def two_sum(a, t):
    lo, hi = 0, len(a) - 1
    while lo < hi:
        s = a[lo] + a[hi]
        if s == t: return (lo, hi)
        if s < t: lo += 1
        else: hi -= 1
    return None`,
  },

  'sliding-window': {
    js: `function maxSumK(a, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += a[i];
  let best = sum;
  for (let i = k; i < a.length; i++) { sum += a[i] - a[i - k]; best = Math.max(best, sum); }
  return best;
}`,
    java: `static int maxSumK(int[] a, int k) {
  int sum = 0;
  for (int i = 0; i < k; i++) sum += a[i];
  int best = sum;
  for (int i = k; i < a.length; i++) { sum += a[i] - a[i - k]; best = Math.max(best, sum); }
  return best;
}`,
    python: `def max_sum_k(a, k):
    s = sum(a[:k]); best = s
    for i in range(k, len(a)):
        s += a[i] - a[i - k]
        best = max(best, s)
    return best`,
  },

  'interval-scheduling': {
    js: `function schedule(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  const out = []; let end = -Infinity;
  for (const [s, e] of intervals)
    if (s >= end) { out.push([s, e]); end = e; }
  return out;
}`,
    java: `static int[][] schedule(int[][] iv) {
  Arrays.sort(iv, (a, b) -> a[1] - b[1]);
  List<int[]> out = new ArrayList<>(); int end = Integer.MIN_VALUE;
  for (int[] x : iv) if (x[0] >= end) { out.add(x); end = x[1]; }
  return out.toArray(new int[0][]);
}`,
    python: `def schedule(iv):
    iv.sort(key=lambda x: x[1])
    out, end = [], float('-inf')
    for s, e in iv:
        if s >= end: out.append((s, e)); end = e
    return out`,
  },

  // ---------- NIVEL 3 — avanzado ----------
  'segment-tree': {
    js: `// Sum segment tree (n hojas, 4*n nodos).
// build O(n), query/point-update O(log n).
function build(a, t, v, tl, tr) {
  if (tl === tr) { t[v] = a[tl]; return; }
  const tm = (tl + tr) >> 1;
  build(a, t, 2 * v, tl, tm); build(a, t, 2 * v + 1, tm + 1, tr);
  t[v] = t[2 * v] + t[2 * v + 1];
}
function query(t, v, tl, tr, l, r) {
  if (l > tr || r < tl) return 0;
  if (l <= tl && tr <= r) return t[v];
  const tm = (tl + tr) >> 1;
  return query(t, 2 * v, tl, tm, l, r) + query(t, 2 * v + 1, tm + 1, tr, l, r);
}`,
    java: `// Segment tree genérico. Ver SegmentTree.java con build/query/update en O(log n).
// Implementación típica: array de 4*n, nodo guarda suma (o min/max).`,
    python: `# Segment tree con build O(n) y query/update O(log n).
# Almacena suma, min o max por nodo. Ver segmenttree.py.`,
  },

  'fenwick-tree': {
    js: `class Fenwick {
  constructor(n) { this.t = new Array(n + 1).fill(0); }
  add(i, x) { for (i++; i < this.t.length; i += i & -i) this.t[i] += x; }
  sum(i) { let s = 0; for (; i > 0; i -= i & -i) s += this.t[i]; return s; }
  range(l, r) { return this.sum(r) - this.sum(l); }
}`,
    java: `static class Fenwick {
  long[] t; int n;
  Fenwick(int n) { this.n = n; t = new long[n + 1]; }
  void add(int i, long x) { for (i++; i <= n; i += i & -i) t[i] += x; }
  long sum(int i) { long s = 0; for (; i > 0; i -= i & -i) s += t[i]; return s; }
}`,
    python: `class Fenwick:
    def __init__(self, n):
        self.t = [0] * (n + 1)
    def add(self, i, x):
        i += 1
        while i < len(self.t): self.t[i] += x; i += i & -i
    def sum(self, i):
        s = 0
        while i > 0: s += self.t[i]; i -= i & -i
        return s`,
  },

  'segment-tree-lazy': {
    js: `// Igual que segment tree + arreglo lazy[] para updates por rango.
// Push antes de bajar al hijo. Query/Update O(log n) amortizado.`,
    java: `// Segment tree con lazy propagation para range updates (sum, set, add, etc.).
// Ver LazySegmentTree.java (~70 líneas).`,
    python: `# Segment tree con lazy propagation para range updates.
# Ver LazySegmentTree.py (~60 líneas).`,
  },

  'persistent-segment-tree': {
    js: `// Versión inmutable del segment tree: cada update crea O(log n) nodos nuevos.
// Compartir nodos no modificados → espacio O(n log n) total.
// Usos: queries en versiones pasadas (offline query).`,
    java: `// Versión inmutable: cada update crea O(log n) nodos nuevos.
// Total: O(n log n) espacio. Usos: "k-th smallest en [l,r] sobre versión p".`,
    python: `# Versión inmutable del segment tree.
# Cada update crea O(log n) nodos nuevos, compartiendo el resto.
# Usos: queries en versiones pasadas del array.`,
  },

  'sqrt-decomposition': {
    js: `// Parte el array en bloques de ~√n. Query: agrega O(√n) bloques + resto.
// Update puntual: O(1). Build: O(n).
// Útil cuando el OP no es asociativo rápido.`,
    java: `// Array dividido en bloques de tamaño ~sqrt(n).
// Query O(√n) o precomputado O(1) para sumas; update O(1).`,
    python: `# Divide el array en bloques de ~sqrt(n).
# Query O(√n) o precomputado; update O(1) para valores puntuales.`,
  },

  'mos-algorithm': {
    js: `// Procesa queries offline en O((n+q) * sqrt(n) * add/remove).
// Reordena queries por (bloque de L, R) y ajusta ventana con add/remove.`,
    java: `// Queries offline reordenadas por (L/√n, R paridad).
// Costo: O((n+q)√n) total. Útil con operación add/remove barata.`,
    python: `# Reordenación de queries (Mo's): O((n+q) sqrt(n)) total.
# Requiere add/remove O(1) sobre la ventana.`,
  },

  'hld': {
    js: `// Heavy-Light Decomposition: descompone árbol en cadenas.
// Permite path queries y updates en O(log² n) con segment tree.
// Ver hld.js (~80 líneas).`,
    java: `// HLD: descompone árbol en cadenas O(n). Path query O(log² n) con segtree.
// Útil para queries en caminos (sum, max, update).`,
    python: `# HLD: cadenas en árbol. Path query/update en O(log² n) con segtree.
# Útil para queries sobre el camino entre dos nodos.`,
  },

  'lca': {
    js: `// Binary lifting: up[u][k] = ancestro 2^k-ésimo de u.
// query(u, v): iguala alturas, sube hasta coincidir → O(log n).
function up(u, k, par) { while (k--) u = par[u]; return u; }`,
    java: `// Binary lifting: up[u][k] = ancestro 2^k-ésimo.
// Build O(n log n). Query O(log n).`,
    python: `# Binary lifting: up[u][k] = ancestro 2^k-ésimo.
# Build O(n log n). Query O(log n).
# Para Euler+sparse table: O(1) query, O(n) build.`,
  },

  'centroid-decomposition': {
    js: `// Recursión: en cada nivel, encuentra el centroide (subárbol de tamaño ≤ n/2).
// Útil para problemas de "k pares en subárbol" (count subpaths, etc.).`,
    java: `// Centroide: vértice cuya remoción deja componentes ≤ n/2.
// Procesa queries en subárboles recursivamente.`,
    python: `# Centroide: vértice cuya remoción deja componentes ≤ n/2.
# Problemas de "k pares/paths" con restricciones en subárbol.`,
  },

  'tree-dp': {
    js: `// DP sobre árbol: rerooting, subtree DP.
// Ejemplo: tamaño de subárbol: sz[u] = 1 + sum(sz[v]) para v hijo de u.
function dfs(u, p, sz, g) {
  sz[u] = 1;
  for (const v of g[u] || []) if (v !== p) { dfs(v, u, sz, g); sz[u] += sz[v]; }
}`,
    java: `// DP en árbol: rerooting, subtree DP.
// Ejemplo: sz[u] = 1 + sum sz[v] para v hijo.`,
    python: `# DP en árbol: rerooting (cambia raíz en O(n)), subtree DP.
# Ejemplo: sz[u] = 1 + sum(sz[v]) para v hijo de u.`,
  },

  'ford-fulkerson': {
    js: `// Aumenta flujo por cualquier camino aumentante (BFS o DFS).
// O(E * max_flow) worst-case → usar Edmonds-Karp o Dinic en práctica.`,
    java: `// Ford-Fulkerson con DFS para encontrar augmenting path.
// Complejidad O(E * max_flow). Usar EK o Dinic en práctica.`,
    python: `# Ford-Fulkerson con DFS.
# O(E * max_flow). En práctica: Edmonds-Karp (O(VE²)) o Dinic (O(V²E)).`,
  },

  'edmonds-karp': {
    js: `// Ford-Fulkerson + BFS (caminos más cortos en número de aristas).
// O(V * E²) garantizado. Buena opción genérica.`,
    java: `// BFS en lugar de DFS para augmenting path.
// Garantía O(V * E²). Implementación simple, predecible.`,
    python: `# BFS para encontrar augmenting paths (más cortos en aristas).
# O(V * E²) garantizado. Suele ser suficiente para V pequeños/medianos.`,
  },

  'dinic': {
    js: `// BFS construye level graph; DFS bloqueante satura una capa.
// O(E * sqrt(V)) para bipartite/unitaria; O(V² * E) general.`,
    java: `// BFS → level graph, DFS → blocking flow. Repite hasta saturar.
// O(E √V) unitarios; O(V² E) general. Mucho más rápido que FF/EK.`,
    python: `# BFS construye level graph; DFS encuentra blocking flow.
# O(E √V) unit; O(V² E) general. Suele ser la opción más rápida.`,
  },

  'push-relabel': {
    js: `// Mantiene 'height' y 'excess' en cada nodo. Más rápido en práctica para grafos densos.
// O(V³) goldberg, con heurísticas: gap relabel, global relabeling.`,
    java: `// Push-relabel: cada nodo mantiene altura y exceso. Más rápido en grafos densos.
// Goldberg-Tarjan: O(V³) con heurísticas gap/global relabel.`,
    python: `# Push-relabel: cada nodo mantiene altura y exceso.
# O(V³) con gap-relabel y global-relabel heurísticas.`,
  },

  'min-cost-max-flow': {
    js: `// Encuentra flujo máximo con costo mínimo (SP augmenting con costos).
// Potenciales Johnson para Dijkstra con aristas negativas → O(F * E log V).`,
    java: `// SP augmenting con costos. Potenciales de Johnson → Dijkstra con aristas negativas.
// O(F * E log V). Útil para asignación con costos.`,
    python: `# SP augmenting con costos. Potenciales para Dijkstra con aristas no-negativas.
# O(F * E log V). Útil para asignación y transporte.`,
  },

  'hopcroft-karp': {
    js: `// Bipartite matching: BFS capas + DFS augmenting.
// O(E * sqrt(V)). Mejor opción para matching bipartito.`,
    java: `// Bipartite matching: BFS + DFS para augmenting paths disjuntos.
// O(E √V). Mejor elección para matching bipartito.`,
    python: `# BFS construye capas; DFS busca augmenting paths disjuntos.
# O(E √V). Mejor algoritmo para matching bipartito.`,
  },

  'hungarian': {
    js: `// Asignación óptima O(n³) usando potentials (dual variables).
// Para assignment problem: minimiza suma de costos de asignación 1-a-1.`,
    java: `// Asignación (n × n): potentials duales + augmenting O(n).
// O(n³). Resuelve el assignment problem óptimo.`,
    python: `# Asignación óptima con variables duales.
# O(n³). Resuelve el assignment problem con pesos.`,
  },

  'suffix-tree': {
    js: `// Ukkonen online construction O(n). Cada hoja = sufijo.
// Caminos: cada hoja se marca con el final del sufijo correspondiente.`,
    java: `// Ukkonen online: O(n) amortizado. Representación implícita con suffix links.
// Implementación cuidadosa: edge-label compression, active point.`,
    python: `# Ukkonen online: O(n) amortizado.
# Implementación compacta: edge compression + suffix links + active point.`,
  },

  'burrows-wheeler': {
    js: `// 1) Construir matrix de rotaciones → 2) Ordenar → 3) Tomar última columna.
// Inversa: con la primera columna reconstruida (move-to-front).`,
    java: `// Transformada BWT: matriz de rotaciones ordenadas, tomar última columna.
// Inversa con LF-mapping y move-to-front para descomprimir.`,
    python: `# BWT: rotar la cadena, ordenar rotaciones, última columna.
# Inversa con LF-mapping. Útil en compresión (bzip2).`,
  },

  'suffix-automaton-advanced': {
    js: `// SAM con técnicas avanzadas: contar substrings distintos, longest common substring multi-string, etc.`,
    java: `// SAM con DP top-down para queries: substrings distintos, LCS multi-string, endpos counting.`,
    python: `# SAM + DP top-down: endpos count, substrings distintos, LCS multi-string.`,
  },

  'meet-in-middle': {
    js: `// Divide n ~36 en dos mitades. Enumera cada mitad (O(2^(n/2))) y combina.
// Útil cuando 2^n es muy grande pero 2^(n/2) cabe.`,
    java: `// Para n hasta ~40: divide en 2 mitades, enumera cada una O(2^(n/2)),
// ordena una y binary-search sobre la otra.`,
    python: `# Para n hasta ~40: divide en 2 mitades.
# Enumera cada mitad (2^(n/2)) y combina con sort/binary search.`,
  },

  'bitmask-dp': {
    js: `// DP[mask] = óptimo para subset mask (usado en TSP, asignación pequeña).
// O(2^n * n) → factible para n ≤ 20.
const dp = new Array(1 << n).fill(Infinity);
dp[0] = 0;
for (let mask = 0; mask < 1 << n; mask++)
  for (let u = 0; u < n; u++) if (!(mask & (1 << u)))
    dp[mask | (1 << u)] = Math.min(dp[mask | (1 << u)], dp[mask] + cost[u][u]);`,
    java: `// DP[mask] = óptimo para subset. TSP: O(2^n * n²).
// Útil para n ≤ 20. Implementar con Long.MAX_VALUE para evitar overflow.`,
    python: `# DP[mask] para subsets. TSP: O(2^n * n²) con n ≤ 20.
# Cuidado con infinito: usar float('inf') o valor grande explícito.`,
  },

  'fft': {
    js: `// Cooley-Tukey radix-2: divide par/impar, recursa, combina con raíces primitivas.
// O(n log n) para multiplicar dos polinomios de grado n.
function fft(a, invert) { /* O(n log n) recursivo */ }`,
    java: `// Cooley-Tukey: polinomios vía evaluación en raíces de unidad. O(n log n).
// Ver FFT.java con bit-reversal y raíces precalculadas.`,
    python: `import numpy as np
# numpy.fft es O(n log n) optimizado (C).
# Para implementación pura: Cooley-Tukey recursivo.`,
  },

  'ntt': {
    js: `// NTT: FFT sobre Z/pZ con raíz primitiva de orden 2^k.
// Útil cuando se necesitan coeficientes exactos (módulo p primo).`,
    java: `// FFT en Z/pZ: raíz n-ésima de unidad ≡ 1, g^(n-1) ≠ 1.
// p = 998244353 (raíz primitiva 3) es el más usado.`,
    python: `MOD = 998244353; G = 3
# NTT: FFT en Z/pZ. Útil para coeficientes exactos módulo p.`,
  },

  'polynomial-mult': {
    js: `// Multiplicar dos polinomios: convolución. O(n²) naive, O(n log n) con FFT/NTT.
function multiply(a, b) { return convolution(a, b); }`,
    java: `// Multiplicación: naive O(n²), FFT/NTT O(n log n) módulo p.
// Para coeficientes exactos, usar NTT (998244353).`,
    python: `# Multiplicación polinomial: O(n log n) con FFT/NTT.
# numpy.convolve / numpy.polymul: O(n²) con padding, o usar NTT.`,
  },

  'sieve': {
    js: `function sieve(n) {
  const isP = new Uint8Array(n + 1).fill(1);
  isP[0] = isP[1] = 0;
  for (let i = 2; i * i <= n; i++) if (isP[i])
    for (let j = i * i; j <= n; j += i) isP[j] = 0;
  return isP;
}`,
    java: `static boolean[] sieve(int n) {
  boolean[] p = new boolean[n + 1]; Arrays.fill(p, true);
  p[0] = p[1] = false;
  for (int i = 2; (long) i * i <= n; i++) if (p[i])
    for (int j = i * i; j <= n; j += i) p[j] = false;
  return p;
}`,
    python: `def sieve(n):
    p = [True] * (n + 1)
    p[0] = p[1] = False
    for i in range(2, int(n**0.5) + 1):
        if p[i]:
            for j in range(i*i, n + 1, i):
                p[j] = False
    return p`,
  },

  'segmented-sieve': {
    js: `// Criba por segmentos: para primos hasta 1e12, procesa en chunks de √n.
// Memoria O(√n) en vez de O(n).
function segmentedSieve(n) { /* ver Sieve.java para implementación completa */ }`,
    java: `// Para n grande (~1e12): criba √n primos, luego barre por segmentos de tamaño √n.
// Memoria O(√n). Útil en contests.`,
    python: `# Criba por segmentos: útil para n hasta 1e12 con O(√n) memoria.
# Primero criba √n primos; luego barre cada segmento de tamaño √n.`,
  },

  'miller-rabin': {
    js: `// Test primalidad probabilístico. Para n < 2^64 bases fijas bastan.
// Bases [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37] son determinísticas para n < 3e18.`,
    java: `// Bases determinísticas para n < 2^64: [2, 325, 9375, 28178, 450775, 9780504, 1795265022].
// O(k log n) donde k = #bases.`,
    python: `def miller_rabin(n, bases=(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37)):
    # Determinístico para n < 3.3e24 con estas bases.
    # O(k * log n) con exponenciación modular.
    ...`,
  },

  'pollard-rho': {
    js: `// Factorización: detecta ciclo con Floyd/rho, usa Miller-Rabin para primalidad.
// O(n^(1/4)) promedio. Útil hasta 64 bits.`,
    java: `// Pollard's Rho: ciclo + GCD para encontrar factor no trivial.
// Combinar con Miller-Rabin para recursión hasta primos.`,
    python: `# Pollard's Rho + Miller-Rabin: factoriza n < 2^64 en O(n^¼).
# Detección de ciclo con Floyd's algorithm.`,
  },

  'mod-exp': {
    js: `function modExp(a, b, m) {
  let r = 1; a %= m;
  while (b > 0) {
    if (b & 1) r = (r * a) % m;
    a = (a * a) % m; b >>= 1;
  }
  return r;
}`,
    java: `static long modExp(long a, long b, long m) {
  long r = 1; a %= m;
  while (b > 0) {
    if ((b & 1) == 1) r = r * a % m;
    a = a * a % m; b >>= 1;
  }
  return r;
}`,
    python: `def mod_exp(a, b, m):
    r = 1; a %= m
    while b > 0:
        if b & 1: r = r * a % m
        a = a * a % m; b >>= 1
    return r`,
  },

  'crt': {
    js: `// Teorema chino del resto: x ≡ a_i (mod m_i) → x = sum a_i * M_i * inv(M_i, m_i) mod M.
// Requiere m_i coprimos. Si no, usar CRT generalizado (Garner's).
function crt(a, m) {
  let M = 1;
  for (const mi of m) M *= mi;
  let x = 0;
  for (let i = 0; i < a.length; i++) {
    const Mi = M / m[i];
    x = (x + a[i] * Mi * modExp(Mi, m[i] - 2, m[i])) % M;
  }
  return (x + M) % M;
}`,
    java: `static long crt(long[] a, long[] m) {
  long M = 1; for (long mi : m) M *= mi;
  long x = 0;
  for (int i = 0; i < a.length; i++) {
    long Mi = M / m[i];
    x = (x + a[i] * Mi * modExp(Mi, m[i] - 2, m[i])) % M;
  }
  return (x + M) % M;
}`,
    python: `def crt(a, m):
    M = 1
    for mi in m: M *= mi
    x = 0
    for i in range(len(a)):
        Mi = M // m[i]
        x = (x + a[i] * Mi * pow(Mi, m[i] - 2, m[i])) % M
    return (x + M) % M`,
  },

  'extended-gcd': {
    js: `function egcd(a, b) {
  if (b === 0) return [a, 1, 0];
  const [g, x, y] = egcd(b, a % b);
  return [g, y, x - Math.floor(a / b) * y];
}
// g = gcd(a, b); x, y tales que a*x + b*y = g.`,
    java: `static long[] egcd(long a, long b) {
  if (b == 0) return new long[]{a, 1, 0};
  long[] r = egcd(b, a % b);
  return new long[]{r[0], r[2], r[1] - (a / b) * r[2]};
}`,
    python: `def egcd(a, b):
    if b == 0: return (a, 1, 0)
    g, x, y = egcd(b, a % b)
    return (g, y, x - (a // b) * y)`,
  },

  // ---------- NIVEL 4 — experto ----------
  'count-min-sketch': {
    js: `// Estructura probabilística: cuenta frecuencias aprox. con subestimación.
// Matriz W×d de counters; hash h_i(x) para cada fila i.
// add(x): ++W[i][h_i(x)]; query(x): min sobre i.
class CMS {
  constructor(w = 1000, d = 5) { this.W = Array.from({ length: d }, () => new Int32Array(w)); this.d = d; this.w = w; }
  add(x) { for (let i = 0; i < this.d; i++) this.W[i][hash(x, i) % this.w]++; }
  query(x) { let m = Infinity; for (let i = 0; i < this.d; i++) m = Math.min(m, this.W[i][hash(x, i) % this.w]); return m; }
}`,
    java: `// Estructura probabilística: cuenta frecuencias con subestimación.
// Matriz W×d; d funciones hash. add O(d), query O(d).
// Sub-estimación garantizada con probabilidad 1 - δ.`,
    python: `# Estructura probabilística para frecuencia (sub-estimación).
# Matriz w × d; cada fila tiene su propia hash.
# add O(d), query O(d). Garantías con probabilidad 1 - δ.`,
  },

  'hyperloglog': {
    js: `// Cardinalidad aproximada con m = 2^b registros.
// Estimador: Z = 1 / sum(2^-M[j]); E = α_m * m² * Z (con bias small/large range).`,
    java: `// Cardinalidad con error ~1.04/√m. Memoria O(m) por elemento O(1).
// Variantes: HLL++, HyperLogLogLog (HLLLL). Usado en Redis.`,
    python: `# Estimador de cardinalidad con error ~1.04/√m.
# Memoria ~6 KB para 10⁹ elementos distintos. Usado en Redis.`,
  },

  'randomized': {
    js: `// Algoritmos Monte Carlo: respuesta correcta con prob. (1-ε).
// Las Vegas: siempre correcto, tiempo esperado.
// Ejemplo: quicksort randomizado (Las Vegas), Karger min-cut (Monte Carlo).`,
    java: `// Monte Carlo: tiempo fijo, prob error ε. Las Vegas: respuesta correcta, tiempo esperado.
// Ejemplo: quicksort con pivote aleatorio (Las Vegas).`,
    python: `# Monte Carlo: tiempo fijo, prob error ε. Las Vegas: tiempo aleatorio, respuesta correcta.
# Ej: quicksort con pivote aleatorio (Las Vegas).`,
  },

  'advanced-flows': {
    js: `// Flujos con capacidades en nodos, costos convexos, multi-commodity.
// Reducción: partir nodos (in/out) con capacidad en la arista.`,
    java: `// Capacidades en nodos, lower bounds, multi-commodity.
// Reducciones: partir nodos in/out, agregar source/sink dummy.`,
    python: `# Flujos con capacidades en nodos, lower bounds, multi-commodity.
# Reducciones a flujo estándar: partiendo nodos o agregando dummy.`,
  },

  'simplex': {
    js: `// Programación lineal: maximizar c·x sujeto a Ax ≤ b, x ≥ 0.
// Camina por vértices del poliedro. Exponencial worst-case, polinomial en práctica.`,
    java: `// LP en forma estándar. Camina por basic feasible solutions.
// Pivot: elige variable entrante (regla de Bland) y saliente (ratio test).`,
    python: `# Programación lineal: maximiza c·x s.t. Ax ≤ b, x ≥ 0.
# Camina por vértices del poliedro. Polinomial en práctica, exp. worst-case.
# Librería: scipy.optimize.linprog (usa HiGHS o revised simplex).`,
  },

  'branch-and-bound': {
    js: `// Enumera soluciones por árbol; poda por cota inferior/superior.
// Ej: TSP con lower bound = suma 2 aristas más cortas por nodo.`,
    java: `// Búsqueda en árbol con poda por cotas (lower/upper bound).
// Aplicaciones: TSP, ILP, branch and price.`,
    python: `# Enumera en árbol con poda por cotas.
# Aplicaciones: TSP, ILP, branch and price.`,
  },

  'approximation': {
    js: `// PTAS: (1+ε) para ε fijo, poly n. FPTAS: poly en n y 1/ε.
// TSP: Christofides 1.5-aproximado (métrico).`,
    java: `// PTAS: (1+ε) para ε fijo. FPTAS: poly en n y 1/ε.
// TSP métrico: Christofides 1.5-aproximado.`,
    python: `# PTAS: (1+ε) para ε fijo. FPTAS: poly en n y 1/ε.
# TSP métrico: Christofides 1.5-aproximado.`,
  },

  'fpt': {
    js: `// FPT: f(k) * n^O(1), k = parámetro. Ej: vertex cover en O(2^k * n).
// Colorabilidad: 2^k * n para k colores.`,
    java: `// Algoritmos parametrizados: f(k) * poly(n) para parámetro k.
// Ej: vertex cover O(2^k * n), treewidth-based.`,
    python: `# Algoritmos FPT: f(k) * n^O(1) para parámetro k.
# Ej: vertex cover O(2^k n), treewidth bounded.`,
  },

  'convex-hull': {
    js: `// Graham scan / Monotone chain.
// Ordena por (x, y), recorre manteniendo lower/upper hull.
function cross(o, a, b) { return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x); }`,
    java: `static int cross(Point o, Point a, Point b) {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}
// Monotone chain: ordena + lower + upper. O(n log n).`,
    python: `def cross(o, a, b):
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

# Monotone chain: ordena, lower/upper hull. O(n log n).`,
  },

  'closest-pair': {
    js: `// Divide y vencerás: ordena por x, divide, merge en franja O(n).
// Por y: mantener lista ordenada. O(n log n).
function dist2(a, b) { const dx = a.x - b.x, dy = a.y - b.y; return dx * dx + dy * dy; }`,
    java: `// D&C: ordena por x, divide, merge por franja. O(n log n).
// Por y, mantener lista sorted usando insertion O(n) en total.`,
    python: `# D&C: divide por x, merge en franja. O(n log n).
# Mantener lista por y ordenada con insertion sort amortizado O(n).`,
  },

  'delaunay-voronoi': {
    js: `// Delaunay: triangulación donde ningún punto está dentro del círculo de un triángulo.
// Voronoi: dual. Algoritmos: Fortune (sweep), Bowyer-Watson (incremental).`,
    java: `// Delaunay: triangulación con propiedad del círculo vacío. Voronoi: dual.
// Algoritmos: Fortune (sweep O(n log n)), Bowyer-Watson (incremental).`,
    python: `# Delaunay (círculo vacío) y Voronoi (dual).
# Algoritmos: Fortune (sweep O(n log n)), Bowyer-Watson (incremental).
# Librería: scipy.spatial.Delaunay / Voronoi.`,
  },

  'half-plane': {
    js: `// Intersección de n semiplanos. Algoritmo: dualizar con sort angular.
// O(n log n) con deque. Aplicaciones: linear programming 2D.`,
    java: `// Intersección de n half-planes: dualiza con sort angular.
// O(n log n) con deque para el convex hull de líneas.`,
    python: `# Intersección de n semiplanos. O(n log n) con sort angular + deque.
# Aplicaciones: linear programming 2D, geometría competitiva.`,
  },

  'b-tree': {
    js: `// Árbol balanceado para disco. Orden t. Cada nodo tiene [t-1, 2t-1] claves.
// Split/merge en O(t). Búsqueda/insert/delete O(log_t n).`,
    java: `// B-tree de orden t: cada nodo [t-1, 2t-1] claves. Split/merge al pasar umbrales.
// Usado en sistemas de archivos y bases de datos.`,
    python: `# B-tree de orden t: cada nodo tiene [t-1, 2t-1] claves.
# Diseñado para minimizar accesos a disco (paginación).`,
  },

  'skip-list': {
    js: `// Lista multinivel. Cada nodo sube a nivel i con prob p (típico 0.5).
// Búsqueda O(log n) esperado. Inserción/deleción con ajuste de niveles.`,
    java: `// Lista multinivel probabilística. Cada nivel mantiene sublista.
// O(log n) esperado para search/insert/delete.`,
    python: `# Lista multinivel probabilística.
# Cada nodo sube de nivel con prob p (típico 0.5).
# O(log n) esperado para search/insert/delete.`,
  },

  'veb-tree': {
    js: `// Van Emde Boas: O(log log u) por operación, espacio O(n).
// Estructura recursiva con min/max por subconjunto. Universo u = 2^k.`,
    java: `// vEB: O(log log u) por op. Recursivo: cada nivel almacena min/max por cluster.
// Requiere universo u = 2^k. Espacio O(n).`,
    python: `# Van Emde Boas: O(log log u) por operación.
# Recursivo, con min/max por cluster. Universo u = 2^k.`,
  },

  'wavelet-tree': {
    js: `// Wavelet tree sobre alfabeto [σ]. k-th smallest en [l,r] en O(log σ).
// Construye árbol recursivo partiendo por valor medio.`,
    java: `// Wavelet tree: range k-th, range count, range sum en O(log σ).
// Construye con bitmaps B por partición.`,
    python: `# Wavelet tree: k-th smallest en rango, range count, range sum.
# Construye árbol recursivo con bitmaps de partición. O(log σ) por query.`,
  },

  'bloom-filter': {
    js: `// m bits, k hashes. add(x): setea k bits. has(x): todos seteados → "puede estar".
// Falsos positivos posibles; nunca falsos negativos.`,
    java: `// m bits, k hashes. add: setea k bits. has: k bits seteados → "puede estar".
// Falsos positivos; nunca falsos negativos.`,
    python: `# m bits, k hashes. add: setea k bits. has: todos seteados → "puede estar".
# Falsos positivos posibles; nunca falsos negativos.`,
  },

  'persistent-ds': {
    js: `// Estructura persistente: cada modificación crea una nueva versión (path copying).
// Ej: persistent segment tree, persistent union-find (con back pointers).`,
    java: `// Estructura persistente: cada update crea O(log n) nodos nuevos, comparte el resto.
// Ej: persistent segtree, persistent DSU (más sutil).`,
    python: `# Estructura persistente: cada update crea O(log n) nodos nuevos.
# Comparte el resto. Ej: persistent segtree, persistent DSU (con back-pointers).`,
  },

  'streaming-kmeans': {
    js: `// Mini-batch k-means: procesa batches pequeños en streaming.
// O(batch * k * d) por iteración. Útil para datos que no caben en RAM.`,
    java: `// Mini-batch k-means para streaming. Procesa batches pequeños.
// Convergencia similar a Lloyd, mucho más rápido por iteración.`,
    python: `# Mini-batch k-means: procesa batches pequeños en streaming.
# sklearn.cluster.MiniBatchKMeans: O(batch * k * d) por iter.
# Útil cuando los datos no caben en RAM.`,
  },

  'external-sort': {
    js: `// Ordenar datos que no caben en RAM: divide en runs, ordena cada uno, merge con k-way heap.
// I/O: O((N/B) * log_{M/B}(N/B)).`,
    java: `// Para N >> RAM: divide en runs, ordena cada uno, k-way merge.
// Minimiza accesos a disco con replacement selection.`,
    python: `# Ordenar N >> RAM: divide en runs, ordena, k-way merge.
# I/O: O((N/B) * log_{M/B}(N/B)). Reemplazo selection para runs largos.`,
  },

  'berlekamp-massey': {
    js: `// Encuentra la recurrencia lineal más corta de una secuencia. O(n²) por iteración.
// Aplicaciones: encontrar n-ésimo término, encontrar loop en automata.`,
    java: `// Algoritmo de Berlekamp-Massey: LFSR mínimo de una secuencia.
// O(n²). Aplicaciones: encontrar n-ésimo término, ataques a LFSR.`,
    python: `# Berlekamp-Massey: LFSR mínimo de una secuencia en O(n²).
# Aplicaciones: encontrar n-ésimo término, ataques cripto a LFSR.`,
  },

  'kitamasa': {
    js: `// Calcula [x^n]P(x) donde P es polinomio módulo recurrencia lineal. O(k² log n).
// Más rápido que BM+K-power cuando k es chico.`,
    java: `// Calcula n-ésimo término de recurrencia lineal en O(k² log n).
// Más rápido que exponenciar polinomio: usa doubling de coefs.`,
    python: `# Kitamasa: n-ésimo término de recurrencia lineal en O(k² log n).
# Componentes de polinomio módulo la recurrencia, con doubling.`,
  },

  'treewidth': {
    js: `// treewidth: tamaño del bag más grande en tree decomposition.
// Muchos problemas NP-hard son FPT en treewidth: O(f(tw) * n).`,
    java: `// Treewidth: medida de "cuan tree-like" es un grafo.
// Muchos problemas NP-hard son FPT en treewidth.`,
    python: `# Treewidth: tamaño del bag máximo en tree decomposition.
# NP-hard en general, pero problemas típicos son FPT en treewidth.`,
  },

  'blossom': {
    js: `// Matching general (no bipartito) en O(V³) (Edmonds' Blossom).
// Encuentra augmenting paths con contracción de blossoms (ciclos impares).`,
    java: `// Edmonds' Blossom: matching general O(V³).
// Encuentra augmenting paths en grafo no bipartito, contrayendo blossoms.`,
    python: `# Edmonds' Blossom: matching general O(V³).
# Contrae blossoms (ciclos impares) para encontrar augmenting paths.`,
  },

  'sparse-table': {
    js: `// Precomputa respuestas para 2^k-ésimo intervalo. Queries idempotentes (min, max, gcd) en O(1).
// Para sumas: requiere prefix sums.
const st = []; const LOG = 17;
function build(a) { /* O(n log n) */ }
function query(l, r) { let k = LOG; let res = 0; while (...) { /*...*/ } return res; }`,
    java: `// Sparse table para queries idempotentes (min, max, gcd) en O(1).
// Build O(n log n). Para sumas: prefix sums.`,
    python: `# Sparse table para queries idempotentes (min/max/gcd) en O(1).
# Build O(n log n). Para sumas: prefix sums.
# RMQ con sparse table: O(1) query, O(n log n) build.`,
  },

  'lsh': {
    js: `// Locality-sensitive hashing: hash similar a bucket similar.
// MinHash para similitud Jaccard; SimHash para coseno. Probabilidad p1 >> p2.`,
    java: `// LSH: hash(b1) ≈ hash(b2) si simil(b1, b2) alta.
// MinHash (Jaccard), SimHash (coseno). Multi-probe LSH para mejorar recall.`,
    python: `# Locality-Sensitive Hashing: items similares caen en mismo bucket.
# MinHash para Jaccard, SimHash para coseno.
# Librería: datasketch (MinHash, HyperLogLog).`,
  },

  'quantum-intro': {
    js: `// Grover: O(√N) para búsqueda no estructurada (vs O(N) clásico).
// Shor: factorización polinómica usando QFT y period-finding.`,
    java: `// Grover: búsqueda no estructurada O(√N). Shor: factorización polinómica.
// QFT: análogo cuántico de la FFT clásica.`,
    python: `# Grover: búsqueda no estructurada O(√N).
# Shor: factorización polinómica con QFT + period-finding.
# Librería: qiskit, cirq, pennylane.`,
  },

  'modern-techniques': {
    js: `// Áreas activas: streaming algorithms, succinct data structures,
// sublinear algorithms, near-linear time (SETH-based).`,
    java: `// Áreas activas: sublinear algorithms, succinct data structures,
// near-linear time, parallel algorithms (work-depth).`,
    python: `# Áreas activas: streaming, succinct, sublinear, near-linear.
# Lectura: "Algorithms" (Dasgupta-Papadimitriou-Vazirani),
# "Competitive Programming 4" (Halim), CP-Algorithms (cp-algorithms.com).`,
  },
};

// ============================================================================
// Ejecución
// ============================================================================

const algorithms = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
let updated = 0, missing = 0;
const missingIds = [];

for (const algo of algorithms) {
  if (CODE[algo.id]) {
    algo.codeExamples = CODE[algo.id];
    updated++;
  } else {
    missing++;
    missingIds.push(algo.id);
  }
}

fs.writeFileSync(JSON_PATH, JSON.stringify(algorithms, null, 2) + '\n', 'utf8');

console.log(`✓ Generador ejecutado.`);
console.log(`  Algorithms actualizados: ${updated} / ${algorithms.length}`);
if (missing > 0) {
  console.log(`  ⚠ Sin ejemplos (${missing}): ${missingIds.join(', ')}`);
}
