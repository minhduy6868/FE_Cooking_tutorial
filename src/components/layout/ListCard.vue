<template>
  <div class="card">
    <img
      :src="image"
      alt="Post Image"
    />
    <div class="card-content">
      <div class="card-title">{{ title }}</div>
      <div class="card-description">{{ description }}</div>
      <div class="card-like-count">Likes: {{ likeCount }}</div>
      <a
        :href="link"
        class="card-link"
        >View Details</a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    image: String,
    likeCount: Number,
    link: String,
  },
}
</script>

<style scoped>
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 16px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.card-description {
  color: #666;
  font-size: 1rem;
  margin: 8px 0;
}

.card-like-count {
  color: #ff6347;
  font-weight: bold;
}

.card-link {
  display: block;
  text-align: center;
  background-color: #ff6347;
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 16px;
}

.card-link:hover {
  background-color: #e55347;
}
</style>
