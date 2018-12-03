class MessagesController < ApplicationController
  bdefore_action :set_group

  def index
    @message = message.new
    @messages = @group.messages.include(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      redirect_to group_messages_path(@group), notice: "メッセージが送信されました"
    else
      redirect_to group_messages_path(@group), alert: "メッセージを入力してください"
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end
