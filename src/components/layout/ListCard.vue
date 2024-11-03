<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <Card
        v-for="(item, index) in items"
        :key="index"
        :title="item.title"
        :description="item.description"
        :image="item.image"
        :link="item.link"
        :category="item.category"
        :time="item.time"
        :comments="item.comments"
      />
    </div>
  </template>
  
  <script>
  import Card from '@/components/ui/card/CardCooking.vue'
  
  export default {
    components: {
      Card
    },
    data() {
      return {
        items: [
          {
            title: "Simplest Salad Recipe ever",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            image: "https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            link: "#",
            category: "Cooking",
            time: "6 mins ago",
            comments: 39
          },
          {
            title: "Best FastFood Ideas (Yummy)",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            image: "https://images.pexels.com/photos/1600727/pexels-photo-1600727.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            link: "#",
            category: "Cooking",
            time: "10 days ago",
            comments: 0
          },
          {
            title: "Why to eat salad?",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            image: "https://images.pexels.com/photos/6086/food-salad-healthy-vegetables.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            link: "#",
            category: "Cooking",
            time: "16 hours ago",
            comments: 9
          },
          {
            title: "Simplest Salad Recipe ever",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            image: "https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            link: "#",
            category: "Cooking",
            time: "6 mins ago",
            comments: 39
          },
          {
            title: "Best FastFood Ideas (Yummy)",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            image: "https://images.pexels.com/photos/1600727/pexels-photo-1600727.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            link: "#",
            category: "Cooking",
            time: "10 days ago",
            comments: 0
          },
          {
            title: "Why to eat salad?",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            image: "https://images.pexels.com/photos/6086/food-salad-healthy-vegetables.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            link: "#",
            category: "Cooking",
            time: "16 hours ago",
            comments: 9
          }
          // Thêm nhiều item nếu cần
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  /* Thêm kiểu cho layout nếu cần */
  </style>
  