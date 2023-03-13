//const containerNode = document.getElementById('fifteen');
//const itemNodes = Array.from(containerNode.querySelectorAll('.item'));
//const countItems = 16;
//const blankNumber = 16;

//itemNodes[countItems - 1].style.display = 'none';
//let matrix = getMatrix(itemNodes.map((el) => parseInt(el.dataset.matrixId)));
//setLocationItems(matrix);

////------------------------------------------------------------------------------------------------------------

//document.getElementById('shuffle').addEventListener('click', () => {
//	const flatMatrix = matrix.flat();
//	const suffledArray = shuffleArray(flatMatrix);
//	matrix = getMatrix(suffledArray);
//	setLocationItems(matrix);
//});

////------------------------------------------------------------------------------------------------------------

//containerNode.addEventListener('click', (e) => {
//	const button = e.target.closest('button');
//	if (!button) {
//		return;
//	}

//	const num = parseInt(button.dataset.matrixId);
//	const coords = findCoordinates(num, matrix);
//	const blankCoords = findCoordinates(blankNumber, matrix);
//	const isValid = isValidForSwap(coords, blankCoords);

//	if (isValid)
//});

////------------------------------------------------------------------------------------------------------------

//function getMatrix(arr) {
//	const matrix = [[], [], [], []];
//	let y = 0;
//	let x = 0;

//	for (let i = 0; i < arr.length; i++) {
//		if (x >= 4) {
//			y++;
//			x = 0;
//		}

//		matrix[y][x] = arr[i];
//		x++;
//	}

//	return matrix;
//}

//function setLocationItems(matrix) {
//	for (let y = 0; y < matrix.length; y++) {
//		for (let x = 0; x < matrix[y].length; x++) {
//			const value = matrix[y][x];
//			const node = itemNodes[value - 1];
//			setNodeStyles(node, x, y);
//		}
//	}
//}

//function setNodeStyles(node, x, y) {
//	const shiftPs = 100;
//	node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`;
//}

//function shuffleArray(array) {
//	return array
//		.map((value) => ({ value, sort: Math.random() }))
//		.sort((a, b) => a.sort - b.sort)
//		.map(({ value }) => {
//			return value;
//		});
//}

//function findCoordinates(number, matrix) {
//	for (let y = 0; y < matrix.length; y++) {
//		for (let x = 0; x < matrix[y].length; x++) {
//			if (matrix[y][x] === number) {
//				return { x, y };
//			}
//		}
//	}

//	return null;
//}

//function isValidForSwap(coord1, coord2) {

//}

const gameNode = document.getElementById('game'),
	containerNode = document.getElementById('fifteen'),
	itemNodes = Array.from(containerNode.querySelectorAll('.item')),
	countItems = 16;
if (16 !== itemNodes.length) throw new Error(`Р”РѕР»Р¶РЅРѕ Р±С‹С‚СЊ СЂРѕРІРЅРѕ ${countItems} items in HTML`);
itemNodes[countItems - 1].style.display = 'none';
let matrix = getMatrix(itemNodes.map((e) => Number(e.dataset.matrixId)));
setPositionItems(matrix);
const maxShuffles = 50,
	shuffleClass = 'gameShuffle';
document.getElementById('shuffle').addEventListener('click', () => {
	let e,
		t = 0;
	clearInterval(e),
		gameNode.classList.add(shuffleClass),
		(e = setInterval(() => {
			randomSwap(matrix),
				setPositionItems(matrix),
				(t += 1),
				t >= maxShuffles && ((t = 0), clearInterval(e), gameNode.classList.remove(shuffleClass));
		}, 70));
});
let blockedCoords = null;
function randomSwap(e) {
	var t = findCoordinatesByNumber(blankNumber, e),
		r = validCoords(e, blockedCoords);
	swap(t, r[Math.floor(Math.random() * r.length)], e), (blockedCoords = t);
}
const blankNumber = 16;
function getMatrix(t) {
	const r = [[], [], [], []];
	let n = 0,
		o = 0;
	for (let e = 0; e < t.length; e++) 4 <= o && (n++, (o = 0)), (r[n][o] = t[e]), o++;
	return r;
}
function setPositionItems(r) {
	for (let t = 0; t < r.length; t++)
		for (let e = 0; e < r[t].length; e++) {
			var n = r[t][e];
			setNodeStyles(itemNodes[n - 1], e, t);
		}
}
function setNodeStyles(e, t, r) {
	e.style.transform = `translate3D(${100 * t}%, ${100 * r}%, 0)`;
}
function shuffleArray(e) {
	return e
		.map((e) => ({ value: e, sort: Math.random() }))
		.sort((e, t) => e.sort - t.sort)
		.map(({ value: e }) => e);
}
function validCoords(r, n) {
	var o = findCoordinatesByNumber(blankNumber, r);
	const a = [];
	for (let t = 0; t < r.length; t++)
		for (let e = 0; e < r[t].length; e++)
			isValidForSwap(o, { x: e, y: t }) && ((n && n.x === e && n.y === t) || a.push({ x: e, y: t }));
	return a;
}
function findCoordinatesByNumber(r, n) {
	for (let t = 0; t < n.length; t++) for (let e = 0; e < n[t].length; e++) if (n[t][e] === r) return { x: e, y: t };
	return null;
}
function isValidForSwap(e, t) {
	var r = Math.abs(e.x - t.x),
		n = Math.abs(e.y - t.y);
	return !((1 !== r && 1 !== n) || (e.x !== t.x && e.y !== t.y));
}
function swap(e, t, r) {
	var n = r[e.y][e.x];
	(r[e.y][e.x] = r[t.y][t.x]), (r[t.y][t.x] = n), isWon(r) && addWonClass();
}
containerNode.addEventListener('click', (e) => {
	var t = e.target.closest('button');
	!t ||
		(isValidForSwap(
			(e = findCoordinatesByNumber(Number(t.dataset.matrixId), matrix)),
			(t = findCoordinatesByNumber(blankNumber, matrix))
		) &&
			(swap(t, e, matrix), setPositionItems(matrix)));
}),
	window.addEventListener('keydown', (e) => {
		if (e.key.includes('Arrow')) {
			var t = findCoordinatesByNumber(blankNumber, matrix);
			const n = { x: t.x, y: t.y };
			var r = e.key.split('Arrow')[1].toLowerCase(),
				e = matrix.length;
			switch (r) {
				case 'up':
					n.y += 1;
					break;
				case 'down':
					--n.y;
					break;
				case 'left':
					n.x += 1;
					break;
				case 'right':
					--n.x;
			}
			n.y >= e || n.y < 0 || n.x >= e || n.x < 0 || (swap(t, n, matrix), setPositionItems(matrix));
		}
	});
const winFlatArr = new Array(16).fill(0).map((e, t) => t + 1);
function isWon(e) {
	var t = e.flat();
	for (let e = 0; e < winFlatArr.length; e++) if (t[e] !== winFlatArr[e]) return !1;
	return !0;
}
const wonClass = 'fifteenWon';
function addWonClass() {
	setTimeout(() => {
		containerNode.classList.add(wonClass),
			setTimeout(() => {
				containerNode.classList.remove(wonClass);
			}, 1e3);
	}, 200);
}
