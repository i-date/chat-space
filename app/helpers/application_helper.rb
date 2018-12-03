module ApplicationHelper
  def format_posted_time(time)
    time.strftime("%Y-%m-%d %H:%M:%S")
  end
end
