const information = document.querySelector('.infor')
const name = document.querySelector('#name')
const age = document.querySelector('#age')
const gender = document.querySelector('#gender')
const phone = document.querySelector('#phone')
const btn = document.querySelector('.adding')
const tbody = document.querySelector('tbody')
const numbers = document.querySelector('.numbers')

const sub_information = document.querySelector('.sub_infor')
const sub_name = document.querySelector('#sub_name')
const sub_age = document.querySelector('#sub_age')
const sub_gender = document.querySelector('#sub_gender')
const sub_phone = document.querySelector('#sub_phone')

let n = 0

function render(list) {
  n = 0
  const htmlStr = list.map((item, index) => {
    n++

    return `<tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.phone}</td>
        <td>${item.gender == 1 ? '男' : '女'}</td>
        <td>${item.time}</td>
        <td data-id=${item.ID}><a href="#" class="dels">删除</a> <a href="#" class="patch">修改</a></td>
      </tr>`
  }).join('')
  numbers.innerHTML = n
  tbody.innerHTML = htmlStr
}

function get_information() {
  axios({
    url: 'http://127.0.0.1:3000/get',
    method: 'get',
    params: {
      // informations
    }
  }).then(result => {
    let list = result.data
    console.log(list)

    render(list)
  }).catch(error => {
    console.log(error.response.data.message)
    alert(error.response.data.message)
  })
}
//获取数据

get_information()

//---------------------------------------------------
//提交数据
information.addEventListener('submit', function (e) {
  e.preventDefault()

  if (!name.value || !age.value || !phone.value) {
    return alert('请输入内容')
  }

  let obj = {
    ID: '',
    name: name.value,
    age: age.value,
    phone: phone.value,
    gender: gender.value == '男' ? 1 : 2,
    time: ''
  }


  axios({
    url: 'http://127.0.0.1:3000/post',
    method: 'post',
    data: obj
  }).then(result => {
    console.log(result)
    get_information()
  }).catch(error => {
    console.log(error)
    alert(error)
  })


  name.value = ''
  age.value = ''
  phone.value = ''
  gender.value = '男'

})

tbody.addEventListener('click', (e) => {
  let temp = ''
  if (e.target.tagName === 'A') {
    if (e.target.className === 'dels') {
      let id = e.target.parentNode.dataset.id

      axios({
        url: 'http://127.0.0.1:3000/delete',
        method: 'delete',
        data: {
          id
        }
      }).then(result => {
        console.log(result)
        get_information()
      }).catch(error => {
        console.log(error.response.data.message)
        alert(error.response.data.message)
      })
    }
    else if (e.target.className === 'patch') {
      let id = e.target.parentNode.dataset.id
      console.log(id)
      axios({
        url: 'http://127.0.0.1:3000/find',
        method: 'get',
        params: { id }
      }).then(result => {
        console.log(result.data[0])
        sub_information.style.display = 'block'
        sub_name.value = result.data[0].name
        sub_age.value = result.data[0].age
        sub_phone.value = result.data[0].phone
        sub_gender.value = result.data[0].gender == '1' ? '男' : '女'
        temp = result.data[0].ID
      }).catch(error => {
        console.log(error.message)
        // alert(error.response.data.message)
      })

      sub_information.addEventListener('submit', function (e) {
        e.preventDefault()
        if (!sub_name.value || !sub_age.value || !sub_phone.value) {
          return alert('请输入内容')
        }

        let obj = {
          ID: temp,
          name: sub_name.value,
          age: sub_age.value,
          phone: sub_phone.value,
          gender: sub_gender.value == '男' ? 1 : 2,
          time: ''
        }
        console.log(obj)
        axios({
          url: 'http://127.0.0.1:3000/patch',
          method: 'post',
          data: obj
        }).then(result => {
          sub_information.style.display = 'none'
          console.log(result)
          get_information()
        })

      })
    }
  }
})
