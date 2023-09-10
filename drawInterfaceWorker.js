self.onmessage = function(event) {
    const { slots, sW, sH, sp, qtys, icons } = event.data;
    const newQtys = qtys.map(qty => qty * 2);  // Dummy operation, replace with actual computation
    postMessage(newQtys);
  };