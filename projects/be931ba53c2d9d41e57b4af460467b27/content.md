Music Singing Voice Generation
---

Project Date: 2020-01-02

Relevant links:
  - [Related snippet of code in GitHub repo][2]

Machine learning approach for recurrent data has been growing rapidly over the last decades. One of the early proposed network is using Long Short-Term Memory in 1997, which is an implementation of artificial RNN network. Next, GRU is introduced as a computationally efficient implementation while having an on par performance with LSTM.

However, the limitation of these networks is their prediction output length being limited to one. This resulted in prediction output being dependent of the last N input while losing the earlier context of the input. Sequence-to-Sequence (Seq2Seq) implementation overcomes this problem by implementing an encoder-decoder architecture bridged by a thought vector. This enables the whole input to be used in the modelling of the thought vector. The decoder will then use the thought vector to subsequently produce output until the end flag is produced. This is why each sequence in the dataset needs to be wrapped in between a start flag and an end flag.

Neural Machine Translation (NMT) had motivated the attention model in Seq2Seq architecture. This attention model assign an attention weight to each token in the sequence, which serves as the priority score for the translation of the token. This attention model enhanced the translation quality with higher BLEU score for text translation in longer sequence.

Neural network is a black box approach in solving data problem. Hence, the effectiveness of Seq2Seq with attention model as a Computer-Assisted Composition model is not clear, but [one][3] of the research has proved that such model can fool a larger number of people for generating natural musics.

In this implementation, I used `tensorflow` and `tensorflow_addons` package to use their Seq2Seq components and to construct a complete Seq2Seq model. In brief, I derived two music features from the music dataset: note and note duration feature. These features will be used to solve two different problems: to generate the next sequence of notes from the given note input, and to determine the suitable note duration given the generated sequence of note.

Therefore, I have two Seq2Seq models that will solve each problem respectively. In each model, the encoder and decoder have an embedding layer before the RNN layer, but the decoder has an attention layer as the first layer instead. I have trained two different models using LSTM and GRU cells in the RNN layer, and both configuration resulted in great accuracy (above 80%) and loss (below 0.5) metric in short number of epoch.

I will discuss the output in the next blog post.

[2]: https://github.com/ye-yu/cac-svs/blob/master/test.py
[3]: https://github.com/nipunagarwala/CS224N_proj
