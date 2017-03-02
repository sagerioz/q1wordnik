let temp = `Within our society, there is an individual. An individual with individual thoughts and actions. But who determines whether or not that individual is correct in their choices? Are our thoughts brain washed through the media with it's hellish ideas or our closet friends that try to direct us in the right direction? No one may ever know what is right or wrong.
So what is ethical relativism anyway? And which individual is behind all of the madness of ethical relativism? It is my understanding that relativist's are believed to think that relativism is true. Ethical Relativism is of a mind to say that whatever one's culture says is right is the right thing for him or her to do. This world we human beings live in is not without a variety of many different and diverse cultures with different cultural practices and hence different moralities. Studying ethics from a philosophical point of view, ethical relativist's might conclude that your wasting your time just like philosophers have always wasted they're time.`
let countHolder = {}
let txtArr = [];
let keys = [];
const setUp = (string) => {
  txtArr = string.split(/\W+/)//splits by all spaces or punctuation. Need a better regex here! For ex., "can't" won't handle well
  console.log(txtArr);
  for (var j = 0; j < txtArr.length; j++) {
    let word = txtArr[j].toLowerCase()
    if(countHolder[word]=== undefined){
      countHolder[word] = 1
      keys.push(word)
    }else{
      countHolder[word] = countHolder[word] + 1
    }
  }
}
console.log("?", countHolder);
const compare = (a, b) => {
  let countA = countHolder[a]
  let countB = countHolder[b]
  return (countB - countA)
}
keys.sort(compare)

for (let i = 0; i < 10; i++) {
  let key = keys[i]
  $('#appendFrequency').append(`${key} : ${counts[key]}`)
}
console.log(setUp(temp));
console.log(countHolder);
console.log(keys);
