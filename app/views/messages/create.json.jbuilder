json.body @message.body
json.image_url @message.image.url
json.user_name @message.user.name
json.created_at format_posted_time(@message.created_at)
json.group_id @message.group.id
