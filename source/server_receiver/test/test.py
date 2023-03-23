from socket import *
import time


def sendMSG(msg):
    sock = socket()
    sock.connect(("127.0.0.1", 3041))
    sock.sendall(msg+b"\n")
    print(sock.recv(2))
    sock.close()


for f in range(0, 1):

      # Clent socket closed!
      # GET / HTTP/1.1
      # Host: 176.214.60.111:85
      # User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.57
      # Accept: */*
      # Accept-Encoding: gzip


      sendMSG(b",Time,04:11:00/25:09:22,Number,5005,Sensors,-3.00,2.31,3.31,0.88,-0.37,-0.75,-1.06,-1.06,-1.06,-2.06,-2.06,-2.06,-3.06,-3.06,-3.06, -4.06,-4.06,-3.00,-3.00,-3.00,-2.00,-2.00,-2.00,-1.00,AKB,4.74,")
      sendMSG(b"10")
      time.sleep(3)
      sendMSG(b"GET / HTTP/1.1 \nHost: 176.214.60.111:85 \nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.57 \nAccept: */* \nAccept-Encoding: gzip")
      time.sleep(3)
      # sendMSG(b",Time,04:11:00/25:09:22,Number,5005,Sensors,-3.00,2.31,3.31,0.88,-0.37,-0.75,-1.06,-1.06,-1.06,-2.06,-2.06,-2.06,-3.06,-3.06,-3.06, -4.06,-4.06,-3.00,-3.00,-3.00,-2.00,-2.00,-2.00,-1.00,AKB,4.74,")
      # sendMSG(b"10")
      

     
