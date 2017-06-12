      //存储localStorage中的数据
      var store = {
      	save(key,value){
      		localStorage.setItem(key,JSON.stringify(value))

      	},
      	fetch(key){
      		return JSON.parse(localStorage.getItem(key))||[]
      	}
      }
      var list = store.fetch('storage')

            //过滤数据 all finished  unfinished
      var filter = {
      		all:function(list){
      					return list

      	},
      finished:function(list){
      	    return list.filter(function(item){
      		return item.isChecked
      })

     },
      unfinished:function(){
             return list.filter(function(item){
      		 return !item.isChecked
      })
     }
  }

      var vm = new Vue({
      	el:'.main',
      	data:{
      		list:list,
      		todo:'',            
      		visibility:'all'  //通过属性值的变化进行筛选
      	},
      	watch:{
           /*list:function(){   //监控list属性
             store.save('storage',this.list)
             }*/
             list:{
             	handler(){
             	store.save('storage',this.list)
             },
             deep:true
          }

      	},
      	computed:{              //记录未完成任务
      		noCheckeLength:function(){   
              return this.list.filter(function(item){
              return !item.isChecked
    	      }).length
      		},
      		
      		filteredList(){
      			//找到过滤的数据就返回过滤数据，没有的话就返回所有数据
      			return filter[this.visibility] ? filter[this.visibility](list) : list

      		}
      	},
      	methods:{
      		addTodo(){  //添加任务
      			//向list中添加一项任务
               	   this.list.push({
               	   	title:this.todo,
               	   	isChecked:false
               	   });
               	   this.todo=''
               },
           
               deleteTodo(todo){         //删除任务
               	   var index = this.list.indexOf(todo)
               	   this.list.splice(index,1);
               }
      	 }
      })
      //任务筛选
      function watchHashChange(){
      	var hash = window.location.hash.slice(1)
      	vm.visibility = hash;
      }
      watchHashChange()
      window.addEventListener('hashchange',watchHashChange)