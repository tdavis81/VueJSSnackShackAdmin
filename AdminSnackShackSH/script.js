
// Change the configurations.  
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };
        
  // Initialize Firebase.
  firebase.initializeApp(config);

new Vue({
  el: "#app",
	data: {
    searchQuery: '',
    gridColumns: ['Item', 'Price', 'Quantity','Action'],
		item: {
        Item: "",
				Price: "",
				Quantity: ""
      },
		index: ""
  },
		methods: {
			add() {
				if(this.item.Item == "" || this.item.Price == "" || this.item.Quantity == ""){
					alert("Cannot add item, all fields required.")
				} else {
					try {
						this.item.Price = '$' + this.item.Price,
						this.$firestore.items.add(this.item)
						.then(()=>{
							this.item.Item = "",
							this.item.Price = "",
							this.item.Quantity = ""
						})
						alert('Item Added!')
				} catch (error) {
						alert('Error, item not added.')
				}
				}
				
			},
			remove(e) {
				try {
					this.$firestore.items.doc(e['.key']).delete()
					alert('Item has been removed!')
				} catch (error) {
					alert('Error, item not removed.')
				}
			},
			edit(e) {
				document.getElementById('editItem').style.display="block",
				document.getElementById('addItem').style.display="none",
				index = e,
				this.item.Item = e.Item,
				this.item.Price = e.Price,
				this.item.Quantity = e.Quantity,
				document.body.scrollTop = document.documentElement.scrollTop = 0	
		},
		update() {
			try {
				this.$firestore.items.doc(index['.key']).update({
					Item: this.item.Item,
					Price: this.item.Price,
					Quantity: this.item.Quantity
				})
				alert('Your item has been edited!')
			} catch(error){
					alert('Not edited.')
			}	
			this.item.Item = "",
			this.item.Price ="",
			this.item.Quantity= "",
			document.getElementById('editItem').style.display="none",
			document.getElementById('addItem').style.display="block"
		}
  },
  firestore() {
     return {
       items: firebase.firestore().collection("SnackShackItems")
     }
  }
})
