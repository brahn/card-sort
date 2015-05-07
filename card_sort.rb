class CardSort

  def initialize(deck_size)
    @deck_size = deck_size
    @steps = [random_permutation(deck_size)]
  end

  def sort
    (0..(num_steps - 1)).each do |step_num|
      do_step(step_num)
    end
    @steps
  end

  def num_steps
    Math.log(@deck_size, 2).ceil
  end

  def do_step(step_num)
    @steps << sort_by_bit(@steps.last, step_num)
  end

  def random_permutation(deck_size)
    (0..(deck_size - 1)).sort_by{rand()}
  end

  def sort_by_bit(list, bit_num)
    pile0 = []
    pile1 = []
    list.each do |elt|
      if bit(elt, bit_num) == 0
        pile0 << elt
      else
        pile1 << elt
      end
    end
    pile0 + pile1
  end

  def bit(num, bit_num)
    (num / (2 ** bit_num)) % 2
  end
end
